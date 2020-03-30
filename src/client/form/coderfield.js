import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { coderuiSchema } from "../schema/coderSchema.js";
import {
  read_a_coder,
  update_a_coder,
  delete_a_coder,
  gitpod_open,
  preview_a_coder
} from "../controller.js";
import AceEditor from "react-ace";
import "brace/mode/c_cpp";
import "brace/theme/monokai";
import ReactTooltip from "react-tooltip";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as coderSchema from "../../../circuito-schema/coder.json";

export function createNewCoder(coderName) {
  return { name: coderName, instantiate: { varname: coderName.toLowerCase() } };
}

export class CoderField extends React.Component {
  constructor(props) {
    super(props);

    this.inputmodalRef = React.createRef();

    this.preventNextReload = false;
    this.state = {
      objName: props.formData,
      addHeaders: false,
      coderPreview: ""
    };
    this.onDataChange = this.onDataChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectNew = this.onSelectNew.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
  }

  onShowModal() {
    analytics.track("Coder Opened", { name: this.state.objName });
    //prevent the reload only once
    if (this.preventNextReload) this.preventNextReload = false;
    else
      read_a_coder(this.state.objName).then(newCoderData => {
        if (newCoderData.error) {
          toast.error("Can't read coder:" + newCoderData.error);
          this.inputmodalRef.current.hideModal();
          return;
        }
        this.setState({ objData: newCoderData });
        ReactTooltip.rebuild();
      });
  }

  onSave() {
    analytics.track("Coder Saved", { name: this.state.objName });
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

      if (Array.isArray(currentFiles) && Array.isArray(newFiles)) {
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
    var newData = createNewCoder(newCoderName);
    analytics.track("Coder Created", { name: newCoderName });

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

  onDelete() {
    if (confirm("Really delete coder?")) {
      analytics.track("Coder Deleted", { name: this.state.objName });
      delete_a_coder(this.state.objName).then(res => {
        if (!(res && res.ok)) toast.error("Delete coder failed");
        else {
          toast.success("Deleted " + this.state.objName, { autoClose: 2000 });
          //this.props.onChange(""); // BUG: not updating form
          this.inputmodalRef.current.hideModal();
          this.setState({ objName: "" });
        }
      });
    }
  }

  updatePreview() {
    this.setState({ coderPreview: "Updating..." })
    preview_a_coder(this.state.objData).then(res => {
      res
        .json()
        .then(data => {
          this.setState({ coderPreview: data.preview });
        })
        .catch(ex => {
          console.log("updatePreview failed", ex);
        });
    });
  }

  render() {
    return (
      <InputGroupModalField
        ref={this.inputmodalRef}
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
        onDelete={this.onDelete}
        onEdit={event => {
          gitpod_open("Coders/" + this.state.objName + ".json");
        }}
      >
        <React.Fragment>
          <EditorForm
            schema={coderSchema.default}
            uiSchema={coderuiSchema(this.props.formContext.controllersList)}
            formData={this.state.objData}
            onChange={this.onDataChange}
            formContext={{ targetFolder: this.state.objName }}
          >
            <Button type="submit" style={{ display: "none" }}>
              Submit
            </Button>
          </EditorForm>
          <h4>
            Preview&nbsp;
            <Button onClick={this.updatePreview} variant="secondary">
              <FontAwesomeIcon icon={faSync} />
            </Button>
          </h4>
          <AceEditor
            mode="c_cpp"
            theme="monokai"
            name="ace_preview"
            width="100%"
            value={this.state.coderPreview}
            editorProps={{ $blockScrolling: true }}
          />
        </React.Fragment>
      </InputGroupModalField>
    );
  }
}
