import React from "react";
import { FormGroup, InputGroup, Modal, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from 'react-toastify';
import { EditorForm } from "./editorform";
import { coderSchema, coderuiSchema } from "../schema/coderSchema.js";
import { read_a_coder, update_a_coder } from "../controller.js";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/monokai";



export class CoderField extends React.Component {
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
        this.save      = this.save.bind(this);
    }

    showModal() {
        read_a_coder(this.state.objName)
            .then(newPartData => this.setState({ objData: newPartData, showModal: true }))
    }

    hideModal() {
        this.setState({ showModal: false });
    }

    componentDidUpdate() {
        this.currentData = null;
    }

    save() {
        update_a_coder(this.state.objName, this.currentData).then((res) => {
            if (!res.ok)
                toast.error("Update coder failed " + res.statusText);
            else
                toast.success("Saved " + this.state.objName, {autoClose: 2000});
            console.log("Update response:", res);
        })
    }

    render() {
        return (
            <React.Fragment>
            <FormGroup>
              <InputGroup>
                <Typeahead
                  options={["a", "b", "c"]}
                  placeholder="Select a coder..."
                  defaultSelected={[this.state.objName]}
                  onInputChange	={input => {
                    this.setState({objName: input});
                    this.props.onChange(input);
                  }}
                />
                <InputGroup.Button className="input-group-append">
                    <Button
                        className="btn-outline-secondary"
                        onClick={this.showModal}>
                        Edit Coder
                    </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            
            <Modal show={this.state.showModal} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Coder {this.state.objName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditorForm
                  schema={coderSchema}
                  uiSchema={coderuiSchema}
                  formData={this.state.objData}
                  onChange={form => this.currentData = form.formData}
                >
                    <Button type="submit" style={{ display: "none" }}>
                      Submit
                    </Button>
                </EditorForm>
                
                Preview
				<AceEditor
					mode="java"
					theme="monokai"
					name="UNIQUE_ID_OF_DIV"
					editorProps={{ $blockScrolling: true }}
				/>
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
