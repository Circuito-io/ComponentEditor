export const coderuiSchema = {
  desc: {
    "ui:widget": "textarea"
  },
  buildSetupText: {
    "ui:widget": "textarea"
  },
  buildTestText: {
    "ui:widget": "textarea"
  }
};

export const coderSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    supportedControllers: {
      type: "object",
      properties: {
        ArduinoUno: {
          type: "boolean"
        },
        ArduinoMicro: {
          type: "boolean"
        },
        ArduinoMaxi: {
          type: "boolean"
        },
        ArduinoPico: {
          type: "boolean"
        },
        ArduinoTera: {
          type: "boolean"
        },
        ArduinoMega: {
          type: "boolean"
        },
        ArduinoMacro: {
          type: "boolean"
        }
      }
    },
    license: {
      type: "string",
      default: ""
    }
  }
};
