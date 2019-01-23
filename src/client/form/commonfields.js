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
  "RPI3B"
];

export var supportedControllersSchema = {
  type: "array",
  title: "Supported Controllers",
  items: {
    type: "string",
    enum: supportedControllersOptions
  },
  uniqueItems: true
};

export var supportedControllersUISchema = {
  "ui:field": "typeahead",
  typeahead: {
    options: supportedControllersOptions,
    placeholder: "Select controllers",
    multiple: true,
    minLength: 0
  }
};
