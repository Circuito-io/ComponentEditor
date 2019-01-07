import { circuitsSchema, circuitsuiSchema } from "./circuitSchema";

var tagsEnum =  ["Controller", "Power supply", "Support"];

export const blockuiSchema = {
  name: {
    "ui:readonly": true
  },
  app: {
    tags: {
      "ui:field": "typeahead",
      typeahead: {
        options: tagsEnum,
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
  required: ["name", "blockId", "category"],
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
      required: ["appName", "tags", "desc"],
      properties: {
        appName: {
          type: "string",
          title: "Application name"
        },
        numericName: {
          type: "string",
          title: "Numeric name"
        },
        shortName: {
          type: "string",
          title: "Short name"
        },
        image: {
          type: "string",
          title: "Image"
        },
        tags: {
          title: "Tags",
          type: "array",
          items: {
            type: "string",
            enum: tagsEnum
          },
          uniqueItems: true
        },
        visible: {
          type: "boolean",
          title: "List in application"
        },
        indicators: {
          type: "object",
          title: "Indicators",
          properties: {
            verified: {
              type: "boolean",
              default: false
            },
            code: {
              type: "boolean",
              title: "Has coder support",
              default: false
            },
            solder: {
              type: "boolean",
              title: "Requires soldering",
              default: false
            }
          }
        },
        desc: {
          type: "string",
          title: "Description"
        }
      }
    },
    notes: {
      type: "string"
    },
    ...circuitsSchema
  }
};
