import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render(symbol) {
        return(
            <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand href="/">CIS 550 OPUS</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink active href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active href={"/company/info/"+symbol}>
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active href={"/company/news/"+symbol}>
                  News
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active href={"/company/sentiment/"+symbol}>
                  Sentiment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active  href={"/company/jobs/" +symbol}>
                  Jobs
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        )
    }
}

export default MenuBar
