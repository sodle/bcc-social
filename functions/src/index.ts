import * as functions from "firebase-functions";
import {defineSecret} from "firebase-functions/params";

import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";

import * as sgMail from "@sendgrid/mail";

initializeApp();

const sendgridSecret = defineSecret("SENDGRID_API_KEY");

export const generateDaily = functions
    .runWith({
      secrets: [sendgridSecret],
    })
    .pubsub.schedule("00 00 * * *")
    .onRun(async (context) => {
      console.log(context.eventId);

      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24, 0, 0, 0);

      const query = getFirestore().collection("posts")
          .where("createDate", ">=", yesterday)
          .orderBy("createDate", "desc");

      const posts = await query.get();
      const postBlurbs: string[] = [];
      const authorEmails: string[] = [];

      for (const post of posts.docs) {
        const postData = post.data();
        const author = await getAuth().getUser(postData.authorUid);

        if (author.email) {
          if (!authorEmails.includes(author.email)) {
            authorEmails.push(author.email);
          }
        }

        postBlurbs.push(`
${author.displayName} (${author.email}${author.emailVerified ? " ✅" : ""})
${postData.createDate.toDate().toUTCString()} UTC
${postData.content}
        `);
      }

      const mail = `
Here's your BCCs, yo!\n\n
${postBlurbs.join("\n\n")}
      `;

      sgMail.setApiKey(sendgridSecret.value());
      for (const authorEmail of authorEmails) {
        await sgMail.send({
          to: authorEmail,
          from: "scoott@bcc.social",
          subject: "Your mail from bcc.social",
          text: mail,
        });
      }
    });
