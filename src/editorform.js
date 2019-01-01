import React from "react";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { ImageWidget } from "./image-widget";
import { ListArrayField } from "./listarrayfield";
import { TabbedArrayField } from "./tabbedarrayfield";
import { TabbedObjectField } from "./tabbedobjectfield";


const editorFields = { typeahead: TypeaheadField, listarray: ListArrayField, tabbedarray: TabbedArrayField, tabbedobject: TabbedObjectField };
const editorWidgets = { imagewidget: ImageWidget };

export const EditorForm = React.forwardRef((props, ref) => {
    return <Form fields={editorFields} widgets={editorWidgets} ref={ref} {...props} />;
});
