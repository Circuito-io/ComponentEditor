const supportedControllersOptions = [
	"ATMega328P",
	"ArduinoLeonardo",
	"ArduinoMega",
	"ArduinoMicro",
	"ArduinoNano",
	"ArduinoProMini5v",
	"ArduinoUno",
	"ATTiny85",
	"Teensy32",
	"ArduinoGemma",
	"ArduinoProMini3v3",
	"ESP32DevKitC",
	"NodeMCU",
	"RPI3B",
];


export var supportedControllersUISchema = {
	"ui:field": "typeahead",
	"uit:title": "Supported Controllers",
	typeahead: {
		options: supportedControllersOptions,
		placeholder: "Select controllers",
		multiple: true,
		minLength: 0
	}
};
