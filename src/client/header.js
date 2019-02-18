import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Preview } from "./preview";
import { Publish } from "./publish";

export class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>
            <img src="https://www.circuito.io/static/images/cir_logo_white.svg" />
            &nbsp; Editor
          </Navbar.Brand>
        </Link>

        {this.props.activeBlock && (
          <Nav>
            <Nav.Link>{this.props.activeBlock}</Nav.Link>
          </Nav>
        )}

        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Nav.Link href="https://talk.circuito.io" target="_blank">
              Help
            </Nav.Link>
            <Preview />
            <Publish />
            <Navbar.Brand
              href="https://github.com/Circuito-io/ComponentEditor"
              target="_blank"
            >
              <img src="GitHub-Mark-Light-32px.png" />
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
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
