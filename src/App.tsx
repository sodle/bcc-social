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
    return <RouterProvider router={router} />;
}

export default App;
