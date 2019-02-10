import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { coderuiSchema } from "../schema/coderSchema.js";
import { read_a_coder, update_a_coder } from "../controller.js";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/monokai";
import ReactTooltip from 'react-tooltip'

import * as coderSchema from "../../../circuito-schema/coder.json";

export class CoderField extends React.Component {
  constructor(props) {
    super(props);

    this.preventNextReload = false;
    this.state = { objName: props.formData, addHeaders: false };
    this.onDataChange = this.onDataChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectNew = this.onSelectNew.bind(this);
  }

  onShowModal() {
    if (!this.preventNextReload)
      read_a_coder(this.state.objName).then(newCoderData => {
        this.setState({ objData: newCoderData });
        ReactTooltip.rebuild();
      });
    this.preventNextReload = false;
  }

  onSave() {
    update_a_coder(this.state.objName, this.lastData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Update coder failed:" + ((res && res.statusText) || "can't connect")
        );
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
    });
  }

  onDataChange(form) {
    var newData = form.formData;
    var newHeaders = [];

    if (this.lastData) {
      var currentFiles = this.lastData.files;
      var newFiles = form.formData.files;

      if (Array.isArray(currentFiles)) {
        newFiles.forEach(filename => {
          if (currentFiles.indexOf(filename) < 0) {
            // found a new file!
            if (
              filename.endsWith(".h") &&
              confirm(`Add ${filename} to Included Header files field?`)
            ) {
              newHeaders.push(filename);
            }
          }
        });
      }
    }

    this.lastData = newData;
    if (newHeaders) this.setState({ addHeaders: newHeaders });
  }

  onSelectNew(newCoderName) {
    var newData = { name: newCoderName };
    this.preventNextReload = true; // don't reload file on modalShow, because it's not ready
    update_a_coder(newCoderName, newData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Create coder failed:" + ((res && res.statusText) || "can't connect")
        );
      else {
        toast.success("Created " + newCoderName, {
          autoClose: 2000
        });
        this.setState({
          objName: newCoderName,
          objData: newData
        });
        this.props.formContext.codersList.push(newCoderName);
        this.props.onChange(newCoderName);
      }
    });
  }

  onSelect(coderName) {
    this.setState({ objName: coderName });
    this.props.onChange(coderName);
  }

  componentDidUpdate() {
    if (this.state.addHeaders) {
      this.lastData.includeHeaders = this.state.addHeaders.concat(
        this.lastData.includeHeaders || []
      );

      this.setState({ addHeaders: false, objData: this.lastData });
    }
  }

  render() {
    return (
      <InputGroupModalField
        labelProps={this.props}
        modalTitle={"Coder " + this.state.objName}
        onSave={this.onSave}
        onShowModal={this.onShowModal}
        options={this.props.formContext.codersList}
        placeholder="Select a coder..."
        defaultSelected={this.state.objName ? [this.state.objName] : []}
        newSelectionPrefix="Create new coder:"
        onSelect={this.onSelect}
        onSelectNew={this.onSelectNew}
      >
        <React.Fragment>
          <EditorForm
            schema={coderSchema.default}
            uiSchema={coderuiSchema}
            formData={this.state.objData}
            onChange={this.onDataChange}
            formContext={{ targetFolder: this.state.objName }}
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
        </React.Fragment>
      </InputGroupModalField>
    );
  }
}
