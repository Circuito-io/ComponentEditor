import React from "react";
import Form from "react-jsonschema-form";
import { Button, Modal } from "react-bootstrap";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";

import { partSchema, partuiSchema } from "./partSchema.js";

export class Part extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Edit Part
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Part Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              schema={partSchema}
              uiSchema={partuiSchema}
              fields={{ typeahead: TypeaheadField }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
