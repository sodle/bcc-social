import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, signInWithGoogle} from "../firebase";

import Composer from "../components/Composer";
import Feed from "../components/Feed";
import {UserBar} from "../components/UserBar";
import {Button, Card, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {Google} from "react-bootstrap-icons";

export default function Root() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    } else if (user) {
        return <>
            <UserBar user={user}/>
            <Container fluid>
                <Row>
                    <Composer/>
                    <Feed/>
                </Row>
            </Container>
        </>;
    } else if (error) {
        console.error(error);
        return <div>Error! {error.message}</div>;
    } else {
        return <Container fluid>
            <Row style={{textAlign: "center"}}>
                <Col xs={12}>
                    <h1>Bcc: The Worst Social Media app</h1>
                    <p>Inspired by a broken email auto-responder I recently dealt with.</p>
                    <Button color="info" onClick={signInWithGoogle}>
                        <Google /> Sign In
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>
                        """Features"""
                    </h2>
                    <ul>
                        <li>
                            <strong>Strict non-anonymity!</strong>
                            <p>Your real name and verified email address are attached to every post.</p>
                        </li>
                        <li>
                            <strong>Artisanal!</strong>
                            <p>Hot new posts are delivered in batches, once per day.</p>
                        </li>
                        <li>
                            <strong>Free speech!</strong>
                            <p>No block button, friends list, or report button.</p>
                        </li>
                    </ul>
                </Col>
                <Col md={6}>
                    <h2>User Story</h2>
                    <ol>
                        <li>On Friday morning, Bob posts his favorite taco recipe. 🌮</li>
                        <li>Friday afternoon, Alice posts a spicy political opinion. 🔥</li>
                        <li>At the end of the day, Bob and Alice each receive each others' posts by email. 📩</li>
                    </ol>
                </Col>
            </Row>
        </Container>;
    }
}