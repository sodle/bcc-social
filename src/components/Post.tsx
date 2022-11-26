import {User} from "firebase/auth";
import {QueryDocumentSnapshot} from "firebase/firestore";
import React from "react";
import {mentionUser} from "../firebase";
import {Card, CardBody, CardText, CardTitle} from "reactstrap";

export function Post(props: { user: User, p: QueryDocumentSnapshot }) {
    return <Card>
        <CardBody>
            <CardTitle>
                <strong>
                    {mentionUser(props.user)}
                </strong>
                &nbsp;&bull;&nbsp;
                <em>
                    {props.p.data().createDate.toDate().toLocaleString()}
                </em>
            </CardTitle>
            <CardText style={{whiteSpace: "pre-line"}}>
                {props.p.data().content}
            </CardText>
        </CardBody>
    </Card>;
}