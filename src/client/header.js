import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Preview } from "./preview";
import { Publish } from "./publish";

export class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark">
        
          <Navbar.Brand>
            <Link to="/">
              <img
                src="https://www.circuito.io/static/images/cir_logo_white.svg"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/">Editor</Link>
          </Navbar.Brand>
          {this.props.activeBlock && (
            <Nav>
            <Nav.Link>{this.props.activeBlock}</Nav.Link>
            </Nav>
          )}
        
        <Nav className="justify-content-end">
          <Nav.Link href="https://talk.circuito.io" target="_blank">
            Help
          </Nav.Link>
          <Preview />
          <Publish />
          <Navbar.Brand>
            <a href="https://github.com/Circuito-io/ComponentEditor" target="_blank">
              <img
                src="GitHub-Mark-Light-32px.png"
              />
            </a>
          </Navbar.Brand>
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
