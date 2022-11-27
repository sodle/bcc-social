import {Button, Col, Container, Row} from "reactstrap";
import {signInWithGitHub, signInWithGoogle} from "../firebase";
import {Google, Github} from "react-bootstrap-icons";
import React from "react";

export function WelcomePage() {
    return <Container fluid>
        <Row style={{textAlign: "center"}}>
            <Col xs={12}>
                <h1>Bcc: The Worst Social Media app</h1>
                <p>Inspired by a broken email auto-responder I recently dealt with.</p>
            </Col>
        </Row>
        <h2>Sign in</h2>
        <Row>
            <Col md={6}>
                <Button color="info" block onClick={signInWithGoogle}>Google <Google /></Button>
            </Col>
            <Col md={6}>
                <Button color="info" block onClick={signInWithGitHub}>GitHub <Github /></Button>
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