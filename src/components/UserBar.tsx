import {Nav, Navbar, NavbarText, NavItem, NavLink} from "reactstrap";
import React from "react";
import {User} from "firebase/auth";
import {mentionUser} from "../firebase";

export function UserBar(props: {user: User}) {
    return <Navbar color="light" light expand>
        <NavbarText>Posting as <strong>{mentionUser(props.user)}</strong></NavbarText>
        <Nav>
            <NavItem>
                <NavLink href="/logout">
                    Log Out
                </NavLink>
            </NavItem>
        </Nav>
    </Navbar>;
}