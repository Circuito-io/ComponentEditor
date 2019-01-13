import {
  circuitsSchema,
  circuitsuiSchema
} from "./circuitSchema";

const tagsEnum = ["Controller", "Power supply", "Support"];
const categoryEnum = ["Controller", "Power supply", "Support"];

export function blockuiSchema(blocksList) {
  return {
    name: {
      "ui:readonly": true,
      classNames: "two-coloumn-field"
    },
    blockId: {
      classNames: "two-coloumn-field"
    },
    category: {
      "ui:field": "typeahead",
      typeahead: {
        options: categoryEnum,
        minLength: 0,
        multiple: true
      }
    },
    app: {
      numericName: {
        classNames: "two-coloumn-field"
      },
      shortName: {
        classNames: "two-coloumn-field"
      },
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
        },
        code: {
          classNames: "two-coloumn-field"
        },
        solder: {
          classNames: "two-coloumn-field"
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
    ...circuitsuiSchema(blocksList)
  }
};

export function blockSchema(blockConnectors) {
  return {
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
        title: "Category",
        type: "array",
        items: {
          type: "string",
          enum: categoryEnum
        },
        uniqueItems: true
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
            title: "Visible in application"
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
      ...circuitsSchema(blockConnectors)
    }
  }
};