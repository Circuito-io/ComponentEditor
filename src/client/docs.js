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
"circuit.part.includeInFirmware": {
    text: `Adds the port definition in the code.`
  },



"circuit.ports": {
    text: `Ports are the representation of the physical interface between circuits.
A port can either require or provide attributes. These attributes are used by the system to connect between ports.`
  },
  "circuit.port.name": {
    text: `Port name should represent its function. In most cases, this name will be similar to the name of the pin it’s connected to.`
  },
  "circuit.port.type": {
    text: `
- Provider port - If a port provides a unique attribute (ADC, PWM, 12V etc.) it will be a ‘provider’ port. Usually used for controllers.
- Requires port - If a port requires an attribute in order to interface correctly with the circuit (LED port requires PWM for dimming) it will be of type ‘requires’.
`
  },
  "circuit.port.requires": {
    text: ` Add all possible connections of the port. Fill the following:
- Cost: The cost of connecting this port using this attribute option.
- Spec: Choose a value from the dropdown menu representing the required function from the microcontroller.
- Volateg: Choose a value from the dropdown menu, representing the required voltage.
`
  },
  "circuit.port.requires.load": {
    text: `Specify the load that the port provides/requires (Only for significant load above 50mA).`
  },
  "circuit.port.unique" : {
    text: "Defines that no other ports will be routed to its provider. 	Connecting Arduino Uno with 2 flex sensors with unique ports, will determine that each unique port will be connected to a different ADC port on the Arduino."
  },
  "circuit.port.chainTo": {
    text: `Used for chainable blocks. (e.g. Led Matrix, Led Strips) When these are defined, the system will connect only the first instance of the chainable blocks to the controller and the rest will be chained to one another using this definition. 
In this field, specify a port name to chain to, it comes together with the ‘Port is Chainable’ in the corresponding provides port.`,
img: "block_chainBlocks.png"
  },

"circuit.port.provides": {
    text: `List all attributes it can provide.
    Note: 
- For power (3.3-5v and GND) pins, leave the spec blank. 
- For ADC pins, only define a spec. 

E.g. Arduino Uno port 3, can be digital in, digital out, PWM and more, all with a 5v voltage. 
`
  },
  "circuit.port.provides.load": {
    text: `Specify the load that the port provides/requires (Only for significant load above 50mA).`
  },
  "circuit.port.provides.redirectLoad": {
    text: `Redirect load verification to another port (used for support blocks only)`
  },
  "circuit.port.provides.chain": {
    text: `Used for chainable blocks. (e.g. Led Matrix, Led Strips) When these are defined, the system will connect only the first instance of the chainable blocks to the controller and the rest will be chained to one another using this definition. This checkbox determines that this port is a chainable port, it comes together with the ‘Chain to port name’ in the corresponding requires port.`,
    img: "block_chainBlocks.png"
  },
  "circuit.port.provides.codename": {
    text: `only used in controllers. Overrides the default port name used in the generated code.  
Format:  #define pin_internal_name codename

E.g. #define PUSHBUTTON_2       2
`
  },
  "circuit.port.provides.codenameRedirect": {
    text: `Only used in support blocks. In case a block is connected to the controller through a support block, it will be given a codename redirect that will represent the pin it’s connected to in the controller.
    E.g. LLC redirects the signals from LV1 to HV1 (after level shifting). When defining the LV1 port, it should have a codename redirect = HV1. This way, the system will know that the sensor pin connected to LV1 pin is redirected to one of the Arduino.
`
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
    text: `The coder information is used to generate the test code provided in the app.
  A block can have multiple coders which will differ according to their supported controllers.

  The coder links between the block and the auto-generated code according to the selected controller. The coder’s information will be used to render the code for your controller. It’s also possible to add external code libraries to coders.`
  },
"circuit.name":{
  text:`Internal name of the code in the database. Must be unique.`
},
"circuit.supportedControllers":{
  text:`List the controllers for which this coder is applicable.`
},
"circuit.files":{
  text:`Upload external code libraries if necessary.`
},
"circuit.license":{
  text:`It is important to also upload the license of the library added, and make sure that it is …`
},
"circuit.classname":{
  text:`Specify the class name for this coder if necessary.`
},
"circuit.varname":{
  text:`Specify the var name for this coder. Must be unique among all coders.`
},
"circuit.code":{
  text:`The firmware.ino is generated by combining templates from all selected coders.
Fill in the following sections and preview the renderd code example to verify.
`
},
"coder.code.global": {
    text: "Used for global variables. Rendered at the top of the file."
  },
  "coder.code.constructors": {
    text: `Define a constructor if necessary.
    It is of the form {{classname}} {{varname}}(values to be passed to the constructor)`
  },
  "coder.code.setup": {
    text: `Used for mandatory setup code.`
  },
  "coder.code.snippet": {
    text: `demonstrates basic use of the part. Should include comments.`
  },


"circuit.parts": {
    text: `Parts are the building blocks of the circuits. They are physical components, represented by an illustrated SVG file, and refer to a specific electronic component model.
A circuit consists of at least one part which interconnects with other parts and ports of the block. These connections are defined in the ‘wiring’ section.
`
  },
  "part.name": {
    text: `Name of the part (defined in “part” in the previous menu).`
  },
  "part.displayName": {
    text: `The name of the part as it appears in the datasheet or product page of the manufacturer or distributor. On the app, this name will appear in the part “view info” popup. `
  },
  "part.desc": {
    text: `A short paragraph describing the part.
Note: if the current part you are defining is the main part of the block (e.g. a pushbutton part of the PushButton block) and the description of the block is valid for this part, there is no need to fill this field. It will automatically be pulled from the block description.
`
  },
  "part.symbol": {
    text: `Add a visual representation of the part in SVG format or cerate a new one using the SVG creator.`
  },
  "part.category": {
    text: ` Determine the category of the block (input/output etc.) See Appendix A in the Docs.`
  },
  "part.placing.onBreadboard": {
    text: `If checked, the system will try to place the part on the breadboard.`
  },
  "part.row": {
    text:
      "Place part on specific row on breadboard (leave blank for auto placing)"
  },
  "part.rotation": {
    text: "Rotate part on breadboard"
  },
  "part.bomItem": {
    text: `Fill in data from a specific supplier.`
  },
  "part.supplier": {
    text: `Name of component distributor/supplier e.g. Octopart, Digi-key, Adafruit etc.`
  },
  "part.image": {
    text: `Upload an image of the component. A dedicated URL will appear once the image is saved.`
  },
  "part.sku": {
    text: `Insert the SKU of the part as it appears on the supplier website.`
  },
  "part.link": {
    text: `Insert the link to the part on the supplier website.`
  },
  "part.price": {
    text: `Insert the price of the part as it appears on the supplier website. in USD`
  },
  "part.packOf": {
    text: `If this item comes in a pack, specify the amount in the pack.`
  },
  "part.headers": {
    text: `Does the part require purchasing additional headers?`
  },
  "part.headers.type": {
    text: `Male or Female headers`
  },
  "part.headers.qty": {
    text: `Number of headers required`
  },
  "part.info.setup": {
    text: `Add a short sentence in case the part requires special setup. e.g. - electrolytic capacitor polarity.
Note: This information appears in the “project guide” under “wire”.`
  },
  "part.info.test": {
    text: `Add a short sentence if there special instructions for testing the part. E.g. - IR Led is visible through a mobile camera.`
  },
  "part.bomAux": {
    text: `Additional parts that need to be added to the BoM
E.g. screws, nuts, bolts, heatsinks, breakouts or special connectors.
Note: these parts aren’t represented in the schematics.
`
  }

};
