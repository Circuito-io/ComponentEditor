import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { BlocksList } from "./BlocksList";
import { Preview } from './preview';

export class Header extends React.Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Components Editor</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <BlocksList blockSelected = {this.props.blockSelected}/>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem>Refresh</NavItem>
              <Preview />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
