import React from "react";
import { FormGroup, InputGroup, Modal, Button } from "react-bootstrap";
import { DefaultLabel } from "react-jsonschema-form-extras/lib/Label";
import { Typeahead } from "react-bootstrap-typeahead";

export class InputGroupModalField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.props.onShowModal();
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <DefaultLabel {...this.props.labelProps} />
          <InputGroup>
            <Typeahead
              options={this.props.options}
              placeholder={this.props.placeholder}
              defaultSelected={this.props.defaultSelected}
              selectHintOnEnter={true}
              allowNew={true}
              newSelectionPrefix={this.props.newSelectionPrefix}
              onChange={selection => {
                if (
                  selection[0] &&
                  typeof selection[0] === "object" &&
                  "customOption" in selection[0]
                ) {
                  // clicked create new
                  this.props.onSelectNew(selection[0].label);
                  this.showModal();
                } else {
                  this.props.onSelect(selection[0]);
                }
              }}
            />
            <InputGroup.Button className="input-group-append">
              <Button
                className="btn-outline-secondary"
                onClick={this.showModal}
              >
                Edit
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>

        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.props.onSave}>Save</Button>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
