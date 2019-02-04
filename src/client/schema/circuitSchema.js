import {
  supportedControllersSchema,
  supportedControllersUISchema
} from "../form/commonfields";

export function circuitsuiSchema(blocksList) {
  return {
    circuits: {
      "ui:field": "tabbedarray",
      items: {
        "ui:field": "tabbedobject",
        "ui:options": {
          tabs: {
            Info: ["name", "priority", "supportedControllers"],
            Parts: ["parts"],
            Blocks: ["requiredBlocks"],
            Coders: ["coders"],
            Ports: ["ports"],
            Wiring: ["wires"]
          }
        },
        name: {
          classNames: "two-coloumn-field"
        },
        priority: {
          classNames: "two-coloumn-field"
        },
        supportedControllers: supportedControllersUISchema,
        parts: {
          "ui:options": {
            orderable: false
          },
          items: {
            name: {
              classNames: "two-coloumn-field"
            },
            part: {
              "ui:field": "partfield",
              classNames: "two-coloumn-field"
            }
          }
        },
        coders: {
          "ui:options": {
            orderable: false
          },
          items: {
            "ui:field": "coderfield"
          }
        },
        wires: {
          items: {
            from: {
              classNames: "two-coloumn-field",
              "ui:widget": "wiredropdown"
            },
            to: {
              classNames: "two-coloumn-field",
              "ui:widget": "wiredropdown"
            }
          },
          "ui:options": {
            orderable: false
          }
        },
        ports: {
          "ui:options": {
            orderable: false
          },
          items: {
            classNames: "well",
            interface: {
              requires: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  spec: {
                    classNames: "two-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    classNames: "two-coloumn-field"
                  }
                }
              },
              provides: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  spec: {
                    classNames: "two-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    classNames: "two-coloumn-field"
                  }
                }
              },
              requiresLoad: {
                classNames: "two-coloumn-field"
              },
              providesLoad: {
                classNames: "two-coloumn-field"
              },
              unique: {
                classNames: "two-coloumn-field"
              },
              isBus: {
                "ui:widget": "hidden"
              }
            }
          }
        },
        requiredBlocks: {
          "ui:options": {
            orderable: false
          },
          items: {
            cost: {
              classNames: "two-coloumn-field"
            },
            blocks: {
              "ui:field": "typeahead",
              classNames: "two-coloumn-field",
              typeahead: {
                options: blocksList,
                minLength: 0,
                multiple: true
              }
            }
          }
        }
      }
    }
  };
}
