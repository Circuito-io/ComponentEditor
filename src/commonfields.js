const supportedControllersOptions = [
				"ArduinoUno",
				"ArduinoMicro",
				"ArduinoMaxi",
				"ArduinoPico",
				"ArduinoTera"
			];


export var supportedControllersUISchema = {
		"ui:field": "typeahead",
		typeahead: {
			options: supportedControllersOptions,
			placeholder: "Select controllers",
			multiple: true,
			minLength: 0
		}
	};
	