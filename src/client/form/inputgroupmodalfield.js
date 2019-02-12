import React from "react";
import { FormGroup, InputGroup, Modal, Button } from "react-bootstrap";
import { DefaultLabel } from "./react-jsonschema-form-extras/Label";
import { Typeahead } from "react-bootstrap-typeahead";

export class InputGroupModalField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editDisabled: false,
      input: this.props.defaultSelected ? this.props.defaultSelected[0] : ""
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.delete;
  }

  showModal() {
    if (this.state.input.length > 0) {
      this.props.onShowModal();
      this.setState({ showModal: true });
    }
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  delete() {}

  componentDidUpdate(prevProps) {
    if (this.props.options.includes(this.state.input)) {
      if (this.state.editDisabled) this.setState({ editDisabled: false });
    } else {
      if (!this.state.editDisabled) this.setState({ editDisabled: true });
    }
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
              onInputChange={text => {
                this.props.onSelect(text);
                this.setState({ input: text });
              }}
              onChange={selection => {
                // ignore unselect (handeled by onInputChange)
                if (selection.length == 0) return;

                if (
                  selection[0] &&
                  typeof selection[0] === "object" &&
                  "customOption" in selection[0]
                ) {
                  // clicked create new
                  this.props.onSelectNew(selection[0].label);
                  this.setState({ input: selection[0].label });
                  this.showModal();
                } else {
                  this.props.onSelect(selection[0]);
                  this.setState({ input: selection[0] });
                }
              }}
            />
            <InputGroup.Button className="input-group-append">
              <Button
                className="btn-outline-secondary"
                onClick={this.showModal}
                disabled={this.state.editDisabled}
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
            {this.props.onEdit && (
              <Button onClick={this.props.onEdit}>
                Open file in code editor
              </Button>
            )}
            {this.props.onDelete && (
              <Button bsStyle="danger" onClick={this.props.onDelete}>
                Delete
              </Button>
            )}
            <Button bsStyle="primary" onClick={this.props.onSave}>
              Save
            </Button>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
