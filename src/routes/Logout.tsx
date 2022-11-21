import React from "react";
import {useSignOut} from "react-firebase-hooks/auth";

import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const [signOut, loading, error] = useSignOut(auth);
    const navigate = useNavigate();

    if (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Logging you out...</div>;
    } else {
        signOut().then(() => {
            navigate("/");
        }).catch(console.error);
        return <div>Logging you out...</div>
    }
}
