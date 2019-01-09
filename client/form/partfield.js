import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputGroupModalField } from "./inputgroupmodalfield";
import { EditorForm } from "./editorform";
import { partSchema, partuiSchema } from "../schema/partSchema.js";
import { read_a_part, update_a_part, list_all_parts } from "../controller.js";
import { SVGCreator } from "../svg-creator";

export class PartField extends InputGroupModalField {
  showModal() {
    read_a_part(this.state.objName).then(newPartData =>
      this.setState({ objData: newPartData, showModal: true })
    );
  }

  save() {
    update_a_part(this.state.objName, this.currentData).then(res => {
      if (!res.ok) toast.error("Update part failed " + res.statusText);
      else toast.success("Saved " + this.state.objName, { autoClose: 2000 });
      console.log("Update response:", res);
    });
  }

  renderModalTitle() {
    return "Part " + this.state.objName
  }

  renderInputGroup() {
    return (<Typeahead
      options={this.props.formContext.partsList}
      placeholder="Select a part..."
      defaultSelected={this.state.objName && [this.state.objName]}
      onChange={selection => {
        this.setState({ objName: selection[0] });
        this.props.onChange(selection[0]);
        }}
    />);
  }

  renderModalBody() {
    return (
    <React.Fragment>
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
            </React.Fragment>);
  }
}
