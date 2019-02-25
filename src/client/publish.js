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
            <h4>Video comming soon.</h4>
            After you fork the repo and commit your changes using the git panel
            on the left, create a pull request using the pull-request panel on
            the right, or directly in github in your fork.
            {/*             
            <ReactPlayer
              url="https://www.youtube.com/watch?v=i3CpeFhRLI4"
              width="90%"
              controls={true}
            /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="secondary" onClick={this.handleShow} style={{margin: "0px 2px"}}>
          Publish
        </Button>
      </React.Fragment>
    );
  }
}
