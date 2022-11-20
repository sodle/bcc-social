import React from 'react';

import {auth, signInWithGoogle} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Root() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    } else if (user) {
        return <div>Hello, {user.displayName}!</div>;
    } else if (error) {
        console.error(error);
        return <div>Error! {error.message}</div>;
    } else {
        return (
            <>
                <div>Please sign in.</div>
                <div>
                    <button onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            </>
        );
    }
}