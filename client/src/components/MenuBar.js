import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

function MenuBar(props){
    return(
        <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand>OPUS</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/search/jobs/">
              Job Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="#" disabled style={{color:'black', fontWeight:'500'}}>
            {props.symbol}:
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
          
        </Nav>
      </Navbar>
    )
}

export default MenuBar
