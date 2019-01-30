import React from "react";
import { Modal, Button, NavItem, Glyphicon } from "react-bootstrap";
import { invoke_upload } from "./controller.js";
import { toast } from "react-toastify";

export class SaveUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false, modalMsg: "" };

    this.onUpload = this.onUpload.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onUpload(event) {
    {
      this.props.onSave();

      const toastId = toast.info("Upload in progress...", {
        autoClose: false
      });

      invoke_upload().then(response => {
        if (!response.ok) {
          toast.update(toastId, {
            render: "Upload failed:" + response.statusText,
            type: toast.TYPE.ERROR,
            autoClose: 5000
          });

          if (response.status === 412) {
            // Precondition failed - validation errors
            response.text().then(text => {
              this.setState({ show: true, modalMsg: text });
            });
          } else {
            console.log(response);
          }
        } else {
          toast.update(toastId, {
            render: "Upload successful",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000
          });
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validation errors, upload cancelled</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto"
            }}
            dangerouslySetInnerHTML={{__html: this.state.modalMsg}}
          >
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <NavItem onClick={this.onUpload}>
          <Glyphicon glyph="glyphicon-refresh" />
          Save & Upload
        </NavItem>
      </React.Fragment>
    );
  }
}
