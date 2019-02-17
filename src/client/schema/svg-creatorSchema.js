export const svguiSchema = {};

export const svgSchema = {
  type: "object",
  required: ["width", "height", "color"],
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    width: {
      title: "Width [mm]",
      default: 0,
      type: "number"
    },
    height: {
      title: "Height [mm]",
      default: 0,
      type: "number"
    },
    color: {
      title: "Color",
      type: "string",
      default: "Red",
      enum: ["#CF2F27", "#45925A", "#0B5597", "#000000", "#338085"],
      enumNames: ["Red", "Green", "Blue", "Black", "Ocean"]
    },
    pinTypes: {
      title: "Pin Type",
      type: "string",
      default: "pads",
      enum: ["pads", "headers"]
    },
    pins: {
      type: "array",
      title: "Pins:",
      items: {
        type: "object",
        required: ["name", "type"],
        properties: {
          name: {
            title: "Pin Name:",
            type: "string"
          },
          type: {
            title: "Pin Type:",
            type: "string",
            default: "male",
            enum: ["male", "female"]
          }
        }
      }
    }
  }
};
