import React from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Preview } from './preview';
import { SaveUpload } from './saveupload';
import { Publish } from './publish';

export class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
            <Nav>
            <Navbar.Brand>
              <a href="/">Components Editor</a>
            </Navbar.Brand>
            <NavItem onClick={this.props.goHome}>
              Home
            </NavItem>
            {
              this.props.activeBlock && (
              <NavItem >
                {this.props.activeBlock}
              </NavItem>
              )
            }
            </Nav>
            <Nav pullRight>
              <NavItem href="https://talk.circuito.io"  target="_blank">
                Help
              </NavItem>
              <SaveUpload onSave={this.props.onSave}/>
              <Preview />
              <Publish />
            </Nav>
        </Navbar>
    );
  }
}
