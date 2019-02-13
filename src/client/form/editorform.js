import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "./react-jsonschema-form-extras/TypeaheadField";
import { ImageWidget } from "./imagewidget";
import { PartField } from "./partfield";
import { CoderField } from "./coderfield";
import { ListArrayField } from "./listarrayfield";
import { TabbedArrayField } from "./tabbedarrayfield";
import { TabbedObjectField } from "./tabbedobjectfield";
import { WireDropDown } from "./wiredropdown";
import { AceEditorField } from "./aceeditorfield";
import { FilesArrayField } from "./filesarray";
import { TooltipDescriptionField } from "./tooltipdescriptionfield";
import { CustomTitleField} from "./titlefield";
import ModifiedCheckboxWidget from "./modifiedcheckboxwidget";

const editorFields = {
  DescriptionField: TooltipDescriptionField,
  TitleField: CustomTitleField,
  typeahead: TypeaheadField,
  listarray: ListArrayField,
  tabbedarray: TabbedArrayField,
  tabbedobject: TabbedObjectField,
  partfield: PartField,
  coderfield: CoderField,
  filesarray: FilesArrayField,
  aceeditor: AceEditorField
};

const editorWidgets = {
  checkbox: ModifiedCheckboxWidget,
  imagewidget: ImageWidget,
  wiredropdown: WireDropDown
};

export const EditorForm = React.forwardRef((props, ref) => {
  return (
    <Form
      fields={editorFields}
      widgets={editorWidgets}
      ref={ref}
      showErrorList={false}
      {...props}
      liveValidate
    />
  );
});
