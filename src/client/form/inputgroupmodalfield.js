import React from "react";
import { FormGroup, InputGroup, Modal, Button } from "react-bootstrap";
import { DefaultLabel } from "react-jsonschema-form-extras/lib/Label";
import { Typeahead } from "react-bootstrap-typeahead";

export class InputGroupModalField extends React.Component {
  constructor(props) {
    super(props);

    this.currentData = null;

    this.state = {
      objName: props.formData,
      showModal: false,
      objData: null
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.save = this.save.bind(this);
    this.renderInputGroup = this.renderInputGroup.bind(this);
    this.renderModalBody  = this.renderModalBody.bind(this);
    this.renderModalTitle = this.renderModalTitle.bind(this);
  }

  showModal() {
    this.setState({ showModal: true })
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  componentDidUpdate() {
    this.currentData = null;
  }

  save() {
    console.log("Save");
  }

  renerInputGroup() {
    return (<Typeahead
    options={["a", "b", "c"]}
    placeholder="Select..."
    defaultSelected={this.state.objName && [this.state.objName]}
    selectHintOnEnter={true}
    allowNew={true}
    onInputChange={input => {
      this.setState({ objName: input });
      this.props.onChange(input);
    }}
  />)
  }

  renderModalTitle() {
    return "Object " + this.state.objName;
  }


  renderModalBody() {
    return "Body";
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <DefaultLabel {...this.props} />

          <InputGroup>
            {this.renderInputGroup()}
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
            <Modal.Title>{this.renderModalTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderModalBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.save}>Save</Button>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
