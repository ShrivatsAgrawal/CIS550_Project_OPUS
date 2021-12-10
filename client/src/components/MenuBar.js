import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

//to use: Import MenuBar from '../components/MenuBar'; <MenuBar symbol={[symbol]}/>

function MenuBar(props){
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
            <NavLink active href={"/company/info/"+props.symbol}>
              Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href={"/company/news/"+props.symbol}>
              News
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href={"/company/sentiment/"+props.symbol}>
              Sentiment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href={"/company/jobs/" +props.symbol}>
              Jobs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active  href={"/search/jobs/" +props.symbol}>
              Job Search
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
}

export default MenuBar
