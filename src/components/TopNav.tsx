import {Navbar, NavbarBrand, NavbarText} from "reactstrap";
import React from "react";

export function TopNav() {
    return <Navbar color="dark" dark expand>
        <NavbarBrand href="/">Bcc:</NavbarBrand>
        <NavbarText>The worst social media app</NavbarText>
    </Navbar>;
}