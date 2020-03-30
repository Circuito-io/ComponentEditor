import * as partSchema from "../../../circuito-schema/part.json";

export function partuiSchema(partsList) {
  return {
    name: {
      "ui:readonly": true
    },
    path: {
      "ui:widget": "hidden"
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
      }
    },
    symbol: {
      "ui:widget": "imagewidget",
      "ui:options": {
        svgcreator: true
      }
    },
    category: {
      "ui:field": "typeahead",
      typeahead: {
        options: partSchema.default.properties.category.items.enum,
        minLength: 0,
        multiple: true
      }
    },
    bom: {
      items: {
        image: {
          "ui:widget": "imagewidget"
        },
        headers: {
          qty: {
            "ui:widget": "updown"
          }
        }
      }
    },
    bomAux: {
      "ui:field": "typeahead",
      "ui:options": {
        forceLabelDisplay: true
      },
      typeahead: {
        options: partsList,
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
}
