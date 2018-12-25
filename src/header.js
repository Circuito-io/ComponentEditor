import React from 'react';
import { Navbar, Nav, NavItem, Breadcrumb } from "react-bootstrap";
import { Preview } from './preview';

export class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
            <Nav>
              <Navbar.Brand>
                <a href="/">Components Editor</a>
              </Navbar.Brand>
              <NavItem>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={this.props.goHome}>Home</Breadcrumb.Item>
                  { (this.props.activeBlock != null) ?
                  (<Breadcrumb.Item active>
                    {this.props.activeBlock}
                  </Breadcrumb.Item>) : ''
                  }
                  </Breadcrumb>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="https://talk.circuito.io"  target="_blank">
                Help
              </NavItem>
              <NavItem onClick={this.props.onSave}>Save</NavItem>
              <Preview />
            </Nav>
        </Navbar>
    );
  }
}
