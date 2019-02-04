import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { coderuiSchema } from "../schema/coderSchema.js";
import { read_a_coder, update_a_coder } from "../controller.js";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/monokai";

import * as coderSchema from "../../../circuito-schema/coder.json";

export class CoderField extends InputGroupModalField {
  showModal() {
    read_a_coder(this.state.objName).then(newCoderData =>
      this.setState({ objData: newCoderData, showModal: true })
    );
  }

  save() {
    update_a_coder(this.state.objName, this.currentData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Update coder failed:" + ((res && res.statusText) || "can't connect")
        );
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
      console.log("Update response:", res);
    });
  }

  renderModalTitle() {
    return "Coder " + this.state.objName;
  }

  renderInputGroup() {
    return (
      <Typeahead
        options={this.props.formContext.codersList}
        placeholder="Select a coder..."
        defaultSelected={this.state.objName && [this.state.objName]}
        selectHintOnEnter={true}
        allowNew={true}
        newSelectionPrefix="Create new coder:"
        onChange={selection => {
          if (
            selection[0] &&
            typeof selection[0] === "object" &&
            "customOption" in selection[0]
          ) {
            // clicked create new
            var newCoderName = selection[0].label;

            update_a_coder(newCoderName, { name: newCoderName }).then(res => {
              if (!(res && res.ok))
                toast.error(
                  "Create coder failed:" +
                    ((res && res.statusText) || "can't connect")
                );
              else {
                toast.success("Created " + newCoderName, {
                  autoClose: 2000
                });
                this.setState({
                  objName: newCoderName
                });
                this.props.formContext.codersList.push(newCoderName);
                this.props.onChange(newCoderName);
                this.showModal();
              }
            });
          } else {
            this.setState({ objName: selection[0] });
            this.props.onChange(selection[0]);
          }
        }}
      />
    );
  }

  renderModalBody() {
    return (
      <React.Fragment>
        <EditorForm
          schema={coderSchema.default}
          uiSchema={coderuiSchema}
          formData={this.state.objData}
          onChange={form => (this.currentData = form.formData)}
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
    );
  }
}
