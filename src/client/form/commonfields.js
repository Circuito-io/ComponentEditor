export function supportedControllersUISchema(controllersList) {
  return {
    "ui:field": "typeahead",
    typeahead: {
      options: controllersList,
      placeholder: "Select controllers",
      multiple: true,
      minLength: 0
    },
    "ui:options": {
      forceLabelDisplay: true
    }
  };
}
