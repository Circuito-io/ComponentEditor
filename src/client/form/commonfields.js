
import * as blockSchema from '../../../circuito-schema/block.json';

export var supportedControllersUISchema = {
  "ui:field": "typeahead",
  typeahead: {
    options: blockSchema.default.definitions.supportedControllers.items.enum,
    placeholder: "Select controllers",
    multiple: true,
    minLength: 0
  }
};
