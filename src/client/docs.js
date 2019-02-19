export const docs = {
  "block.name": {
    text:
      "Name of the block as it is stored in the database. This should reflect the component, eg. pushbutton"
  },
  "block.category": {
    text: `Category the block belong to. Examples:
- _Inputs:_ Sensors, buttons, MEMS
- _Outputs:_ Actuators, lights, display
- _Power_ supply: Wall adaptors, batteries
- _Controllers:_ Arduino, Raspberry Pi
- _Connectivity:_ IoT, Wifi, bluetooth, RF
- _Support:_ Regulators, capacitors, transistors, FTDI`
  },
  "block.appName": {
    text: "The block display name as it appears in the app’s components list",
    img: "block_appName.png"
  },
  "block.image": {
    text:
      "Image of the main component in the block. A dedicated URL will appear once the image is saved.",
    img: "block_image.png"
  },
  "block.requiresSoldering": {
    text: "Display an indicator that parts in this block require soldering",
    img: "block_soldering.png"
  },
  "block.description": {
    text:
      `A short paragraph in html describing the block, its features and uses. This description will appear in the block’s info pop up
      always wrap you paragraphs in \`\`\`<p>text</p>\`\`\``,
    img: "block_desc.png"
  },
  "block.alternativeBlock": {
    text: `Alternative block to try if this one failed.
    Relevant for controllers and power supplies.

    For example:
- ArduinoMega is an alternative for ArduinoUno because it has more pins.
- 12 Power supply is an alternative for a 9v battery.`
  },
  "block.notes": {
    text:
      "Additional information about the block eg. references to datasheets, or relevant tutorials. Doesn't appear in the app"
  },
  "block.visible": {
    text: "When checked, the block will appear in the app component list."
  },
  "block.circuits": {
    text:
      "Circuits represent different circuitry applicable for this block. Circuits may defer in _support blocks_, _parts_ and _ports_"
  },
  "circuit.name": {
    text: `Name should represent the purpose of the circuit:
- voltage levels (3.3/5v) 
- interface (SPI/I2c) 
- other (USB/barreljack/withshiftregister)

If there is only one circuit, name it 'default'. 

All circuits in a block must have a unique name.`
  },
  "circuit.cost": {
    text: `Cost of the circuit.
Relative units. (0-inf)
Circuits with a lower cost will be tried first.`
  },
  "circuit.supportedControllers": {
    text: `Select the controllers that are able to interface with the circuit.`
  },
  "circuit.part.instanceName": {
    text: `Label of the part in the circuit.`
  },
  "circuit.part.part": {
    text: `Select the part you want to add from the dropdown menu or create a new part, by entering a name and clicking on the Edit button.`
  },
  "circuit.part.rotation": {
    text:
      "Specify part rotation (deg.) on canvas. Leave blank for auto-rotation"
  },
  "circuit.supportBlocks": {
    text: `Some blocks require additional blocks in order to function. These may come in the form of power regulators, logic level converters etc. E.g servo motors require 5v power supply with a higher current than the Arduino Uno 5v pin. In this case, you’ll need to add a 5v regulator block that will be added automatically by the system.
      You can specify different combinations of single or multiple support blocks. These will be prioritized by their cost. (set a value 10-99)`
  },
  "circuit.supportBlocks.cost": {
    text: `Cost of the support block.
Relative units. (0-inf)
Support blocks with a lower cost will be tried first. For controllers, there may be more than one support block.`
  },
  "circuit.ports": {
    text: `Ports are the representation of the physical interface between circuits. 
A port can either require or provide attributes. These attributes are used by the system to connect between ports.`
  },
  "circuit.port.name": {
    text: `Port name should represent its function. In most cases, this name will be similar to the name of the pin it’s connected to.`
  },
  "circuit.part.includeInFirmware": {
    text: `When generating code, create a variable for this port.
    The variable's value will hold to codename of this port's provider.`
  },
  "circuit.port.unique" : {
    text: "When enabled no other ports will be routed to this port's provider. Used for example in DigitalIn ports, where only one block is expected to be routed to."
  },
  "circuit.port.chainTo": {
    text: "Chain to this port to another port when possible."
  },
  "part.description": {
    text: "The name of the part as it appears in the datasheet or product page of the manufacturer or distributor. On the app, this name will appear in the part “view info” popup."
  },
  "part.placing.onBreadboard": {
    text: "When enabled the system will try to place the part on the breadboard, otherwise it will be floating around the breadboard."
  },
  "part.row": {
    text:
      "Place part on specific row on breadboard (leave blank for auto placing)"
  },
  "part.rotation": {
    text: "Rotate part on breadboard"
  },
  "coder.code.global": {
    text: "TBD Code to inject as global variables"
  },
  "coder.code.constructors": {
    text: "TBD Code to inject to instantiate object"
  },
  "coder.code.setup": {
    text: "TBD Code to inject setup section"
  },
  "coder.code.snippet": {
    text: "TBD Code to inject as snippet"
  }
};
