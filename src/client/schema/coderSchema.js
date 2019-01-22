import {
  supportedControllersSchema,
  supportedControllersUISchema
} from "../form/commonfields";

export const coderuiSchema = {
  desc: {
    "ui:widget": "textarea"
  },
  supportedControllers: supportedControllersUISchema,
  files: {
    "ui:options": {
      orderable: false
    }
  },
  includeHeaders: {
    "ui:options": {
      orderable: false
    }
  },
  license: {
    "ui:field": "typeahead",
    typeahead: {
      options: ["Apache", "BSD2", "BSD3", "GPL3", "LGPL", "MIT"],
      placeholder: "Apache, BSD2, BSD3, GPL3, LGPL, MIT...",
      allowNew: true,
      newSelectionPrefix: "Other license:",
      minLength: 0
    }
  },
  code: {
    global: {
      "ui:widget": "textarea"
    },
    constructors: {
      "ui:widget": "textarea"
    },
    setup: {
      "ui:widget": "textarea"
    },
    snippetCode: {
      "ui:widget": "textarea"
    }
  }
};
