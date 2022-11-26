import React from 'react';
import {Container} from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/Root";
import Logout from "./routes/Logout";
import {TopNav} from "./components/TopNav";

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
    return <>
        <TopNav/>
        <Container fluid>
            <RouterProvider router={router}/>
        </Container>
    </>;
}

export default App;
