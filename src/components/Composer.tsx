import React, {useState} from "react";
import {collection, addDoc} from 'firebase/firestore';

import {auth, db} from "../firebase";
import {useIdToken} from "react-firebase-hooks/auth";

const postsCollection = collection(db, "posts")

export default function Composer() {
    const [postText, setPostText] = useState("");
    const [user, loading, error] = useIdToken(auth);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error getting user: {error.message}</div>;
    }
    if (!user) {
        return <div>Not logged in!</div>
    }

    return (
        <div>
            <h2><label htmlFor="composer">Write a post!</label></h2>
            <div><textarea id="composer" value={postText} rows={5} cols={50} onChange={e => setPostText(e.target.value)} /></div>
            <div><button onClick={() => {
                const post = postText.trim()
                if (post.length === 0) {
                    alert("Your post is empty!");
                } else {
                    addDoc(postsCollection, {
                        authorUid: user.uid,
                        createDate: new Date(),
                        content: post
                    }).then(p => {
                        console.log(`Created post ${p.id}.`);
                        setPostText("");
                    }).catch(e => {
                        console.error(e);
                        alert(`Error: ${e.message}`);
                    });
                }
            }}>Post</button></div>
        </div>
    );
}