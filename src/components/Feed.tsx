import React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {useIdToken} from "react-firebase-hooks/auth";

import {collection, orderBy, query, where} from "firebase/firestore";

import {DateTime} from "luxon";

import {auth, db} from "../firebase";
import {Post} from "./Post";
import {Alert, Card, CardBody, Col} from "reactstrap";

const postsCollection = collection(db, "posts");

export default function Feed() {
    let midnight = DateTime.fromObject(
        {}, {zone: "America/Los_Angeles"}
    ).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    });

    const [user, userLoading, userError] = useIdToken(auth);
    const userId = user ? user.uid : "nil";

    const postQuery = query(
        postsCollection,
        orderBy("createDate", "desc"),
        where("authorUid", "==", userId),
        where("createDate", ">=", midnight.toJSDate())
    );
    const [snapshot, dbLoading, dbError] = useCollection(postQuery, {
        snapshotListenOptions: {
            includeMetadataChanges: true
        }
    });

    if (userLoading || dbLoading) {
        return <div>Loading...</div>;
    }
    if (userError) {
        console.error(userError);
        return <div>Auth Error: {userError.message}</div>
    }
    if (!user) {
        return <div>Not logged in!</div>;
    }
    if (dbError) {
        console.error(dbError);
        return <div>Database Error: {dbError.message}</div>
    }

    return (
        <Col md={9}>
            <h2>Your Outbox</h2>
            <Alert color="info">
                Posts you share today will be shared with everyone else who posted today.
            </Alert>
            {(!snapshot || snapshot.docs.length === 0) ?
                <Card>
                    <CardBody>
                        You haven't posted yet today!
                    </CardBody>
                </Card> :
                snapshot.docs.map(p => (
                    <Post key={p.id} user={user} p={p}/>
                ))
            }
        </Col>
    )
}
