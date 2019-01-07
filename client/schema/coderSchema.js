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

export const coderSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    supportedControllers: supportedControllersSchema,
    files: {
      type: "array",
      title: "Library files",
      items: {
        type: "string"
      }
    },
    uploadFiles: {
      type: "array",
      title: "Upload library files",
      items: {
        type: "string",
        format: "data-url"
      }
    },
    license: {
      type: "string",
      title: "License",
      default: ""
    },
    instantiate: {
      type: "object",
      title: "Variable generation settings",
      properties: {
        classname: {
          type: "string",
          title: "Class name"
        },
        varname: {
          type: "string",
          title: "Variable name"
        },
        ports: {
          type: "string",
          title: "Ports"
        }
      }
    },
    includeHeaders: {
      type: "string",
      title: "Include header files"
    },
    code: {
      type: "object",
      title: "Code snippets",
      properties: {
        global: {
          type: "string"
        },
        constructors: {
          type: "string"
        },
        setup: {
          type: "string"
        },
        snippetCode: {
          type: "string"
        }
      }
    }
  }
};
