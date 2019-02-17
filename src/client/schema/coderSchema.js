import { supportedControllersUISchema } from "../form/commonfields";

export function coderuiSchema(controllersList) {
  return {
    path: {
      "ui:widget": "hidden"
    },
    desc: {
      "ui:widget": "textarea"
    },
    supportedControllers: supportedControllersUISchema(controllersList),
    files: {
      "ui:field": "filesarray"
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
        "ui:field": "aceeditor"
      },
      constructors: {
        "ui:field": "aceeditor"
      },
      setup: {
        "ui:field": "aceeditor"
      },
      snippetCode: {
        "ui:field": "aceeditor"
      }
    }
  };
}
