import {User} from "firebase/auth";
import {UserBar} from "../components/UserBar";
import {Container, Row} from "reactstrap";
import Composer from "../components/Composer";
import Feed from "../components/Feed";
import React from "react";

export function Dashboard(props: { user: User }) {
    return <>
        <UserBar user={props.user}/>
        <Container fluid>
            <Row>
                <Composer/>
                <Feed/>
            </Row>
        </Container>
    </>;
}