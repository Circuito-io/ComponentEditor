import {
  circuitsSchema,
  circuitsuiSchema
} from "./circuitSchema";

export const blockuiSchema = {
  name: {
    "ui:readonly": true
  },
  app: {
    tags: {
      "ui:field": "typeahead",
      typeahead: {
        options: ["Controller", "Power supply", "Support"],
        minLength: 0,
        multiple: true
      }
    },
    image: {
      "ui:widget": "imagewidget"
    },
    indicators: {
      verified: {
        "ui:widget": "hidden"
      }
    },
    desc: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 7
      }
    }
  },
  notes: {
    "ui:widget": "textarea",
    "ui:placeholder": "Changelog",
    "ui:help": "Describe any modification you made in a new line",
    "ui:options": {
      rows: 7
    }
  },
  ...circuitsuiSchema
};

export const blockSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    blockId: {
      type: "string",
      title: "Block ID"
    },
    category: {
      type: "string",
      title: "Category",
      enum: ["output", "input", "controller", "power", "support"]
    },
    app: {
      type: "object",
      title: "Appearance",
      properties: {
        appName: {
          type: "string",
        },
        numericName: {
          type: "string",
        },
        shortName: {
          type: "string",
        },
        image: {
          type: "string"
        },
        tags: {
          type: "string"
        },
        visible: {
          type: "boolean",
          title: "List in application"
        },
        indicators: {
          type: "object",
          title: "Indicators",
          properties: {
            "verified": {
              type: "boolean",
              default: false
            },
            "code": {
              type: "boolean",
              title: "Has coder support",
              default: false
            },
            "solder": {
              type: "boolean",
              title: "Requires soldering",
              default: false
            },
          }
        },
        desc: {
          type: "string",
          title: "Description"
        },
      }
    },
    notes: {
      type: "string"
    },
    ...circuitsSchema
  }
};