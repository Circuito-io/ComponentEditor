import React from 'react';
import {Link} from 'react-router-dom';
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
          <Link to='/'>Components Editor</Link>
        </Navbar.Brand>
<<<<<<< HEAD
        <NavItem href="/">
          Home
        </NavItem>
=======
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
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
Header.displayName = "Header";
/*Header.propTypes = {
  activeBlock: React.PropTypes.string,
}*/

Header.defaultProps = {
  activeBlock: null,
}
