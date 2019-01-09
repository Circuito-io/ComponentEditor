import React from "react";
import { FormGroup, InputGroup, Modal, Button } from "react-bootstrap";
import { DefaultLabel } from "react-jsonschema-form-extras/lib/Label";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";
import { EditorForm } from "./editorform";
import { partSchema, partuiSchema } from "../schema/partSchema.js";
import { read_a_part, update_a_part } from "../controller.js";
import { SVGCreator } from "../svg-creator";

export class PartField extends React.Component {
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
  }

  showModal() {
    read_a_part(this.state.objName).then(newPartData =>
      this.setState({ objData: newPartData, showModal: true })
    );
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  componentDidUpdate() {
    this.currentData = null;
  }

  save() {
    update_a_part(this.state.objName, this.currentData).then(res => {
      if (!res.ok) toast.error("Update part failed " + res.statusText);
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
      console.log("Update response:", res);
    });
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <DefaultLabel {...this.props} />

          <InputGroup>
            <Typeahead
              options={["a", "b", "c"]}
              placeholder="Select a part..."
              defaultSelected={this.state.objName && [this.state.objName]}
              onInputChange={input => {
                this.setState({ objName: input });
                this.props.onChange(input);
              }}
            />
            <InputGroup.Button className="input-group-append">
              <Button
                className="btn-outline-secondary"
                onClick={this.showModal}
              >
                Edit Part
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>

        <Modal show={this.state.showModal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Part {this.state.objName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditorForm
              schema={partSchema}
              uiSchema={partuiSchema}
              formData={this.state.objData}
              onChange={form => (this.currentData = form.formData)}
            >
              <Button type="submit" style={{ display: "none" }}>
                Submit
              </Button>
            </EditorForm>

            <SVGCreator />
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
