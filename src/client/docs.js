export const docs = {
  "block.name": {
    text:
      "The unique block name in the database. This should reflect the component, eg. pushbutton."
  },
  "block.category": {
    text: `Category the block belongs to. Examples:
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
      "Upload an image of the main component in the block. A dedicated URL will appear once the image is saved.",
    img: "block_image.png"
  },
  "block.requiresSoldering": {
    text: "Display an indicator in the app that parts in this block require soldering",
    img: "block_soldering.png"
  },
  "block.description": {
    text:
      `A short paragraph in html describing the block, its features and uses. This description will appear in the block’s info pop up.
      always wrap you paragraphs in \`\`\`<p>text</p>\`\`\``,
    img: "block_desc.png"
  },
  "block.alternativeBlock": {
    text: `Used for controllers and power supplies.
The system supports swapping components in case the calculation failed. This field is used to define the replacing block. After exhausting all possibilities with this component, the system will swap to the alternative block, and go over the possibilities again.

    For example:
- ArduinoMega is an alternative for ArduinoUno because it has more pins.
- 12 Power supply is an alternative for a 9v battery.`
  },
  "block.notes": {
    text:
      "Additional information about the block eg. references to datasheets, or relevant tutorials. Doesn't appear in the app"
  },
  "block.visible": {
    text: "if checked, the block will appear in the app component list."
  },
  "block.circuits": {
    text:
      "Circuits Derive from the main block. They represent different circuitry applicable to this block. Circuits may defer in support blocks*, parts and ports."
  },
  "circuit.name": {
    text: `Name should represent the purpose of the circuit:
- voltage levels (3.3/5v)
- interface (SPI/I2c)
- other (USB/barreljack/withshiftregister)

All circuits in a block must have a unique name.`
  },
  "circuit.cost": {
    text: `Set a cost for the circuit (Appendix B).`
  },
  "circuit.supportedControllers": {
    text: `The system uses this field, to define whether a chosen block can connect to the chosen controller.
- When adding blocks: list all the controllers that can interface with this block
- When adding a controller: choose a controller out of the list, that provides a similar interface to the new defined controller.

E.g:  when adding a controller similar to Arduino Uno, choose “Arduino Uno” out of the list. This will determine that all the blocks that can connect to Arduino Uno can now connect to the new controller.
`
  },
  "circuit.part.instanceName": {
    text: `the label of the part in the circuit, used as a reference to this part, in the wiring section. Auto-generated according to the selected part.`
  },
  "circuit.part.part": {
    text: `select the part you want to add from the dropdown menu or create a new part. To create a new part, start writing its name, and click on “create”.`
  },
  "circuit.part.rotation": {
    text:
      "If blank, the system will try to optimally place the part on the circuit, based on the geometry of its SVG file. To override this preset, specify the rotation angle in degrees."
  },
"circuit.ports": {
    text: `Ports are the representation of the physical interface between circuits.
A port can either require or provide attributes. These attributes are used by the system to connect between ports.`
  },
  "circuit.port.name": {
    text: `Port name should represent its function. In most cases, this name will be similar to the name of the pin it’s connected to.`
  },
  "circuit.part.includeInFirmware": {
    text: `adds the port definition in the code.`
  },
  "circuit.port.unique" : {
    text: "Defines that no other ports will be routed to its provider. 	Connecting Arduino Uno with 2 flex sensors with unique ports, will determine that each unique port will be connected to a different ADC port on the Arduino."
  },
  "circuit.port.chainTo": {
    text: "Chain to this port to another port when possible."
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

  "circuit.coders": {
    text: `WEARE MAKING DOC.`
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
