const partCategoryEnum = ["output", "input", "support", "power"];

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
      "ui:widget": "imagewidget"
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
    auxParts: {
      "ui:field": "typeahead",
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
