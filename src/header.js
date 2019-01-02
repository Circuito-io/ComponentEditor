import React from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Preview } from './preview';
import { Upload } from './upload';

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
              <NavItem onClick={this.props.onSave}>Save</NavItem>
              <Upload />
              <Preview />
            </Nav>
        </Navbar>
    );
  }
}
