import React, {useState} from "react";
import {collection, addDoc} from 'firebase/firestore';

import {auth, db} from "../firebase";
import {useIdToken} from "react-firebase-hooks/auth";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

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

    function post() {
        const post = postText.trim()
        if (post.length === 0) {
            alert("Your post is empty!");
        } else if (!user) {
            alert("You are not logged in!")
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
    }

    return <Col md="3">
        <Form>
            <FormGroup>
                <h2>
                    <Label for="composer">Write a post!</Label>
                </h2>
                <Input id="composer" type="textarea" rows={10}
                       value={postText} onChange={e => setPostText(e.target.value)} />
            </FormGroup>
            <Button block color="success" onClick={post}>
                Post
            </Button>
        </Form>
    </Col>;
}