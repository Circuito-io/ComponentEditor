import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { partuiSchema } from "../schema/partSchema.js";
import { read_a_part, update_a_part } from "../controller.js";
import { SVGCreator } from "../svg-creator";

import * as partSchema from "../../../circuito-schema/part.json";

export class PartField extends InputGroupModalField {
  showModal() {
    read_a_part(this.state.objName).then(newPartData =>
      this.setState({ objData: newPartData, showModal: true })
    );
  }

  save() {
    update_a_part(this.state.objName, this.currentData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Update part failed:" + ((res && res.statusText) || "can't connect")
        );
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
      console.log("Update response:", res);
    });
  }

  renderModalTitle() {
    return "Part " + this.state.objName;
  }

  renderInputGroup() {
    return (
      <Typeahead
        options={this.props.formContext.partsList}
        placeholder="Select a part..."
        defaultSelected={this.state.objName && [this.state.objName]}
        selectHintOnEnter={true}
        allowNew={true}
        newSelectionPrefix="Create new part:"
        onChange={selection => {
          if (
            selection[0] &&
            typeof selection[0] === "object" &&
            "customOption" in selection[0]
          ) {
            // clicked create new
            var newPartName = selection[0].label;

            update_a_part(newPartName, { name: newPartName }).then(res => {
              if (!(res && res.ok))
                toast.error(
                  "Create part failed:" +
                    ((res && res.statusText) || "can't connect")
                );
              else {
                toast.success("Created " + newPartName, {
                  autoClose: 2000
                });
                this.setState({
                  objName: newPartName
                });
                this.props.formContext.partsList.push(newPartName);
                this.props.onChange(newPartName);
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
          schema={partSchema.default}
          uiSchema={partuiSchema(this.props.formContext.partsList)}
          formData={this.state.objData}
          onChange={form => (this.currentData = form.formData)}
        >
          <Button type="submit" style={{ display: "none" }}>
            Submit
          </Button>
        </EditorForm>

        <SVGCreator />
      </React.Fragment>
    );
  }
}
