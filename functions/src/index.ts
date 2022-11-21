import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";

import * as sgMail from "@sendgrid/mail";

initializeApp();

export const generateDaily = functions.pubsub.schedule("00 00 * * *")
    .onRun(async (context) => {
      console.log(context.eventId);

      const midnightYesterday = new Date();
      midnightYesterday.setUTCHours(0);
      midnightYesterday.setUTCMinutes(0);
      midnightYesterday.setUTCSeconds(0);
      midnightYesterday.setUTCMilliseconds(0);
      midnightYesterday.setUTCDate(midnightYesterday.getUTCDate() - 1);

      const query = getFirestore().collection("posts")
          .where("createDate", ">=", midnightYesterday)
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

      sgMail.setApiKey("SG.jiHCxjQiQvyPl-NrpcBwRA." +
          "xbDDCj0ymmAe0qhlwQO7CrECApG73xgBy69-9M_pYww");
      for (const authorEmail of authorEmails) {
        await sgMail.send({
          to: authorEmail,
          from: "scoott@bcc.social",
          subject: "Your mail from bcc.social",
          text: mail,
        });
      }
    });
