import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { ImageWidget } from "./image-widget";
import { ListArrayField } from "./listarrayfield";
import { TabbedArrayField } from "./tabbedarrayfield";


const editorFields = { typeahead: TypeaheadField, listarray: ListArrayField, tabbedarray: TabbedArrayField };
const editorWidgets = { imagewidget: ImageWidget };

export function EditorForm(props) {
    return <Form fields={editorFields} widgets={editorWidgets} {...props} />;
}
