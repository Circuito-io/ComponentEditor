import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { ImageWidget } from "./imagewidget";
import { PartField } from "./partfield";
import { CoderField } from "./coderfield";
import { ListArrayField } from "./listarrayfield";
import { TabbedArrayField } from "./tabbedarrayfield";
import { TabbedObjectField } from "./tabbedobjectfield";
import { WireDropDown } from "./wiredropdown";
import { AceEditorWidget} from "./aceeditorwidget";
<<<<<<< HEAD

=======
import { FilesArrayField } from "./filesarray";
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91

const editorFields = {
  typeahead: TypeaheadField,
  listarray: ListArrayField,
  tabbedarray: TabbedArrayField,
  tabbedobject: TabbedObjectField,
  partfield: PartField,
<<<<<<< HEAD
  coderfield: CoderField
=======
  coderfield: CoderField,
  filesarray: FilesArrayField
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
};

const editorWidgets = {
  imagewidget: ImageWidget,
  wiredropdown: WireDropDown,
  aceeditor: AceEditorWidget
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
