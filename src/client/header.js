import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Preview } from "./preview";
import { Publish } from "./publish";

export class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Nav>
          <Navbar.Brand>
            <Image
              src="https://www.circuito.io/static/images/cir_logo_white.svg"
              width="110"
            />
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/">Editor</Link>
          </Navbar.Brand>
          {this.props.activeBlock && (
            <Nav.Link>{this.props.activeBlock}</Nav.Link>
          )}
        </Nav>
        <Nav pullRight>
          <Nav.Link href="https://talk.circuito.io" target="_blank">
            Help
          </Nav.Link>
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
  activeBlock: null
};
