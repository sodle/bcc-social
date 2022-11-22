import React from 'react';
import './App.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/Root";
import Logout from "./routes/Logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/logout",
        element: <Logout />
    }
])

function App() {
    return <div className="App">
        <h1>BCC:</h1>
        <h2>The worst social media app!</h2>
        <h2>Inspired by a really dumb email chain I was on recently!</h2>
        <p>You can post stuff here. Nobody except for you can see it, until midnight. At midnight Pacific Time, everyone who posted today will get an email with all the other posts from today.</p>
        <hr/>
        <RouterProvider router={router} />
    </div>;
}

export default App;
