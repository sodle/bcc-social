import React from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {WelcomePage} from "../pages/WelcomePage";
import {Dashboard} from "../pages/Dashboard";

export default function Root() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    } else if (user) {
        return <Dashboard user={user}/>;
    } else if (error) {
        console.error(error);
        return <div>Error! {error.message}</div>;
    } else {
        return <WelcomePage/>;
    }
}