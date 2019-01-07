const partCategoryEnum = ['output', 'input', 'support', 'power']
const auxPartsEnum = ['Heatsink', 'Bolt', 'Nut']

export const partuiSchema = {
  name: {
    "ui:readonly": true
  },
  desc: {
    "ui:widget": "textarea"
  },
  info: {
    setup: {
      "ui:widget": "textarea"
    },
    test: {
      "ui:widget": "textarea"
    },
  },
  symbol: {
    URL: {
      "ui:widget": "imagewidget",
      "ui:help": "SVG must follow circuito.io/blog/SVG-Guidelines"
    }
  },
  category: {
    "ui:field": "typeahead",
    typeahead: {
      options: partCategoryEnum,
      minLength: 0,
      multiple: true
    }
  },
  bom: {
    items: {
      image: { "ui:widget": "imagewidget" }
    }
  },
  headers: {
    headersQty: {
      "ui:widget": "updown"
    }
  },
  auxParts: {
    "ui:field": "typeahead",
    typeahead: {
      options: auxPartsEnum,
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
      type: "object",
      properties: {
        URL: {
          type: "string",
          title: "Symbol (SVG)"
        },
        ref: {
          type: "string"
        }
      }
    },
    symbolParam: {
      type: "string",
      title: "Symbol parameter",
      default: ""
    },
    category: {
      title: "Category",
      type: "array",
      items: {
        type: "string",
        enum: partCategoryEnum
      },
      uniqueItems: true
    },
    placing: {
      type: "object",
      properties: {
        onBreadboard: {
          type: "boolean",
          title: "Place on breadboard"
        }
      }
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
    bom: {
      type: "array",
      items: {
        type: "object",
        title: "BoM data",
        properties: {
          name: {
            type: "string",
            title: "Supplier",
            default: "",
            enum: ["octopart", "digikey", "other"]
          },
          image: {
            type: "string",
            title: "Image"
          },
          SKU: { type: "string", default: "" },
          link: { type: "string", title: "Link", default: "" },
          price: { type: "string", title: "Price (USD)", default: "" }
        }
      }
    },
    info: {
      type: "object",
      properties: {
        setup: {
          type: "string",
          title: "Setup info",
          default: ""
        },
        test: {
          type: "string",
          title: "Test info",
          default: ""
        },
      }
    },
    auxParts: {
      type: "array",
      title: "Auxilary parts",
      items: {
        type: "string",
        enum: auxPartsEnum
      },
      uniqueItems: true
    },
    notes: {
      type: "string"
    }
  }
};
