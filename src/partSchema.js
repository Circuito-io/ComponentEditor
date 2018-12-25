import { ImageWidget } from "./ImageWidget";

export const partuiSchema = {
  desc: {
    "ui:widget": "textarea"
  },
  buildSetupText: {
    "ui:widget": "textarea"
  },
  buildTestText: {
    "ui:widget": "textarea"
  },
  symbol: {
    "ui:widget": ImageWidget,
    "ui:help": "SVG must follow circuito.io/blog/SVG-Guidelines"
  },
  img: {
    "ui:widget": ImageWidget
  },
  headers: {
    headersQty: {
      "ui:widget": "updown"
    }
  },
  auxParts: {
    "ui:field": "typeahead",
    typeahead: {
      options: ["Heatsink", "Screw", "Nut"],
      minLength: 0,
      multiple: true
    }
  },
  notes: {
    "ui:widget": "textarea",
    "ui:placeholder": "Changelog",
    "ui:help": "Describe any modification you made in a new line",
    "ui:options": {
      rows: 7
    }
  }
};

export const partSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    displayName: {
      type: "string",
      title: "Display Name"
    },
    desc: {
      type: "string",
      title: "Description"
    },
    symbol: {
      type: "string",
      title: "Symbol (SVG)"
    },
    symbolParam: {
      type: "string",
      title: "Symbol parameter",
      default: ""
    },
    img: {
      type: "string",
      title: "Image"
    },
    category: {
      type: "string",
      enum: ["output", "input", "controller", "power", "support"]
    },
    placeOnBreadboard: {
      type: "boolean",
      title: "Place on breadboard"
    },
    headers: {
      type: "object",
      title: "Headers",
      properties: {
        requiresHeaders: {
          type: "boolean",
          title: "Requires headers"
        },
        headersType: {
          type: "string",
          title: "Headers type",
          enum: ["female", "male"]
        },
        headersQty: {
          type: "integer",
          title: "Headers quantity"
        }
      }
    },
    bomData: {
      type: "object",
      title: "BoM data",
      properties: {
        supplier: {
          type: "string",
          title: "Supplier",
          default: "",
          enum: ["octopart", "digikey", "other"]
        },
        SKU: { type: "string", default: "" },
        link: { type: "string", title: "Link", default: "" },
        price: { type: "string", title: "Price (USD)", default: "" }
      }
    },
    buildSetupText: {
      type: "string",
      title: "Setup info",
      default: ""
    },
    buildTestText: {
      type: "string",
      title: "Test info",
      default: ""
    },
    auxParts: {
      type: "string",
      title: "Auxilary parts"
    },
    notes: {
      type: "string"
    }
  }
};
