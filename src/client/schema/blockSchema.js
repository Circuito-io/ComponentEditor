import * as blockSchema from '../../../circuito-schema/block.json';
import {
  circuitsSchema,
  circuitsuiSchema
} from "./circuitSchema";


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
        options: blockSchema.default.properties.app.properties.tags.items.enum,
        minLength: 0,
        multiple: true
      }
    },
    app: {
      numericName: {
        "ui:widget": "hidden"
      },
      shortName: {
        "ui:widget": "hidden"
      },
      tags: {
        "ui:field": "typeahead",
        typeahead: {
          options: blockSchema.default.properties.category.items.enum,
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

