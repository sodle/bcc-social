import React from "react";
import {useCollection} from "react-firebase-hooks/firestore";

import {collection, query, where, orderBy} from "firebase/firestore";

import {auth, db} from "../firebase";
import {useIdToken} from "react-firebase-hooks/auth";

const postsCollection = collection(db, "posts");

export default function Feed() {
    let midnight = new Date();
    midnight.setUTCHours(0);
    midnight.setUTCMinutes(0);
    midnight.setUTCSeconds(0);
    midnight.setUTCMilliseconds(0);

    const [user, userLoading, userError] = useIdToken(auth);
    const userId = user ? user.uid : "nil";

    const postQuery = query(
        postsCollection,
        orderBy("createDate", "desc"),
        where("authorUid", "==", userId),
        where("createDate", ">=", midnight)
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

    if (!snapshot || snapshot.docs.length === 0) {
        return (
            <div>
                <h2>You haven't posted today!</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>Your posts today</h2>
            {snapshot.docs.map(p => (
                <div key={p.id} style={{whiteSpace: 'pre-line'}}>
                    <hr />
                    <p><strong>{user.displayName} ({user.email}{user.emailVerified ? " ✅" : ""}) &bull; {p.data().createDate.toDate().toLocaleString()}</strong></p>
                    <p>{p.data().content}</p>
                </div>
            ))}
        </div>
    )
}
