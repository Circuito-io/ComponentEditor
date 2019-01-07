import {
  supportedControllersSchema,
  supportedControllersUISchema
} from "../form/commonfields";
import { all_parts_cached } from "../controller";

const blockListEnum = ["ADXL345", "ADXL335", "Resistor"];

export const circuitsuiSchema = {
  circuit: {
    "ui:field": "tabbedarray",
    items: {
      "ui:field": "tabbedobject",
      "ui:options": {
        tabs: {
          Info: ["name", "priority", "supportedControllers"],
          Parts: ["parts"],
          Blocks: ["supportBlocks"],
          Coders: ["coders"],
          Wiring: ["ports", "wires"]
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
            classNames: "two-coloumn-field"
          },
          to: {
            classNames: "two-coloumn-field"
          }
        },
        "ui:options": {
          orderable: false
        }
      },
      ports: {
        "ui:options": {
          orderable: false
        }
      },
      supportBlocks: {
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
              options: blockListEnum,
              minLength: 0,
              multiple: true
            }
          }
        }
      }
    }
  }
};

export const circuitsSchema = {
  circuit: {
    type: "array",
    title: "",
    items: {
      type: "object",
      required: ["name", "priority"],
      properties: {
        name: {
          type: "string",
          title: "Name"
        },
        priority: {
          type: "integer",
          title: "Priority",
          default: 0
        },
        supportedControllers: supportedControllersSchema,
        parts: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "part"],
            properties: {
              name: {
                type: "string",
                title: "Instance name"
              },
              part: {
                type: "string",
                title: "Part"
              }
            }
          }
        },
        supportBlocks: {
          type: "array",
          title: "Support Blocks [list only support and power blocks]",
          items: {
            type: "object",
            properties: {
              cost: {
                type: "integer",
                default: 0
              },
              blocks: {
                type: "array",
                items: {
                  type: "string",
                  enum: blockListEnum
                },
                uniqueItems: true
              }
            }
          }
        },
        coders: {
          type: "array",
          items: {
            type: "string"
          }
        },
        wires: {
          type: "array",
          items: {
            type: "object",
            properties: {
              from: {
                type: "string",
                default: ""
              },
              to: {
                type: "string",
                default: ""
              }
            }
          }
        },
        ports: {
          type: "array",
          items: {
            type: "object",
            required: ["name"],
            properties: {
              name: {
                type: "string",
                default: ""
              },
              codename: {
                title: "codename [show for category controller only]",
                type: "string",
                default: ""
              },
              interface: {
                type: "object",
                properties: {
                  requires: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        cost: {
                          type: "integer",
                          default: 0
                        },
                        spec: {
                          type: "string",
                          default: "",
                          enum: [
                            "",
                            "SDA",
                            "SCL",
                            "SCK",
                            "MISO",
                            "MOSI",
                            "ADC",
                            "DigitalIn",
                            "DigitalIn-Int",
                            "DigitalOut",
                            "PWM"
                          ]
                        },
                        voltage: {
                          type: "string",
                          enum: [
                            "GND",
                            "3.3v",
                            "3.7v",
                            "5v",
                            "6v",
                            "7.4",
                            "9v",
                            "12v"
                          ]
                        }
                      }
                    }
                  },
                  provides: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        spec: {
                          type: "string",
                          enum: [
                            "",
                            "SDA",
                            "SCL",
                            "SCK",
                            "MISO",
                            "MOSI",
                            "ADC",
                            "DigitalIn",
                            "DigitalIn-Int",
                            "DigitalOut",
                            "PWM"
                          ]
                        },
                        voltage: {
                          type: "string",
                          enum: [
                            "GND",
                            "3.3v",
                            "3.7v",
                            "5v",
                            "6v",
                            "7.4",
                            "9v",
                            "12v"
                          ]
                        }
                      }
                    }
                  },
                  requiresLoad: {
                    type: "integer"
                  },
                  providesLoad: {
                    type: "integer"
                  },
                  unique: {
                    type: "boolean"
                  },
                  isBus: {
                    type: "boolean"
                  },
                  includeInFirmware: {
                    type: "boolean"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
