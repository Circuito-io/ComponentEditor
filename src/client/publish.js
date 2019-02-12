import React from "react";
import { Modal, Nav, Button } from "react-bootstrap";
import ReactPlayer from "react-player";

export class Publish extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>How to publish your work</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dLYCeUOOsX0"
              width="90%"
              controls={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Nav.Link onClick={this.handleShow}>Publish</Nav.Link>
      </React.Fragment>
    );
  }
}
