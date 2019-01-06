import { supportedControllersUISchema } from "../form/commonfields"
import { all_parts_cached } from "../controller"

export const circuitsuiSchema = {
	circuit: {
		"ui:field": "tabbedarray",
		items: {
			"ui:field": "tabbedobject",
			"ui:options": {
				tabs: {
					Info: ['name', 'priority', 'supportedControllers'],
					Parts: ['parts'],
					Blocks: ['blocks'],
					Coders: ['coders'],
					Wiring: ['ports', 'wires']
				}
			},
			supportedControllers: supportedControllersUISchema,
			parts: {
				"ui:options": {
					orderable: false
				},
				items: {
					part: {
						"ui:field": "partfield"
					}
				}
			},
			coders: {
				"ui:options": {
					orderable: false
				},
				items: {
					"ui:field": "coderfield",
				}
			},
			wires: {
				"ui:options": {
					orderable: false
				}
			},
			ports: {
				"ui:options": {
					orderable: false
				}
			},
			blocks: {
				"ui:options": {
					orderable: false
				},
				items: {
					blocks: {
						"ui:field": "typeahead",
						typeahead: {
							options: ["ADXL345", "ADXL335", "Resistor"],
							minLength: 0,
							multiple: true
						}
					}
				}
			},
		}
	}
}

export const circuitsSchema = {
	type: "object",
	properties: {
		circuit: {
			type: "array",
			title: "",
			items: {
				"type": "object",
				"properties": {
					name: {
						type: "string"
					},
					priority: {
						type: "integer",
						default: 0
					},
					supportedControllers: {
						type: "string"
					},
					parts: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string"
								},
								part: {
									type: "string"
								}
							}
						}
					},
					requires: {
						type: "array",
						title: "SupportBlocks [list only support and power blocks]",
						items: {
							type: "object",
							properties: {
								cost: {
									type: "integer",
									default: 0
								},
								blocks: {
									type: "array",
									items: {
										type: "string"
									}
								}
							}
						}
					},
					coders: {
						type: "array",
						items: {
							type: "string",
						}
					},
					wires: {
						type: "array",
						items: {
							type: "object",
							properties: {
								from: {
									type: "string",
									default: ""
								},
								to: {
									type: "string",
									default: ""
								}
							}
						}
					},
					ports: {
						type: "array",
						items: {
							type: "object",
							properties: {
								name: {
									type: "string",
									default: ""
								},
								codename: {
									title: "codename [show for category controller only]",
									type: "string",
									default: ""
								},
								interface: {
									type: "object",
										properties: {
											requires: {
												type: "array",
												items: {
													type: "object",
													properties: {
														cost: {
															type: "integer",
															default: 0
														},
														spec: {
															type: "string",
															default: "",
															enum: ["", "SDA", "SCL", "SCK", "MISO", "MOSI", "ADC", "DigitalIn", "DigitalIn-Int", "DigitalOut", "PWM"]
														},
														voltage: {
															type: "string",
															enum: ["GND", "3.3v", "3.7v", "5v", "6v", "7.4", "9v", "12v"]
														}
													}
												}
											},
											provides: {
												type: "array",
												items: {
													type: "object",
													properties: {
														spec: {
															type: "string",
															enum: ["", "SDA", "SCL", "SCK", "MISO", "MOSI", "ADC", "DigitalIn", "DigitalIn-Int", "DigitalOut", "PWM"]
														},
														voltage: {
															type: "string",
															enum: ["GND", "3.3v", "3.7v", "5v", "6v", "7.4", "9v", "12v"]
														}
													}
												}
											},
											requiresLoad: {
												type: "integer"
											},
											providesLoad: {
												type: "integer"
											},
											unique: {
												type: "boolean"
											},
											isBus: {
												type: "boolean"
											},
											includeInFirmware: {
												type: "boolean"
											}
										}
								}


							},
							depenedencies: {}
						}
					}
				}
			}
		}
	}
};
