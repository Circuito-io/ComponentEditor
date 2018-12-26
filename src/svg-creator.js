import React from "react";
import Form from "react-jsonschema-form";
import { Button, Modal, Well } from "react-bootstrap";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { svgSchema, svguiSchema } from "./svg-creatorSchema.js";



export class SVGCreator extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createSVG = this.createSVG.bind(this);

        this.state = {
            show: true,
            resSVG: '',
            defaultSVG: {
                name: "Demo",
                width: 100,
                height: 150,
                color: 'blue',
                pins: [
                    { name: "GND", type: "male" },
                    { name: "VCC", type: "male" }
                ]
            },
            svgRef: ''
        };
    }

    createSVG(form) {
        var formData = form.formData;
        console.log('Creating SVG', formData);

        var pins = ''
        if (formData.pins != null)
            pins = formData.pins.map((pin, index) => { 
                var x = 10+7.2*index;
                var y = formData.height-10;
                return (
                    <g>
                        <text
                            x={x}
                            y={y}
                            fill="white"
                            transform={`rotate(-90,${x},${y})`}
                        >
                            {pin.name}
                        </text>
                        <circle 
                            cx={x}
                            cy={y}
                            data-cir-type={pin.type}
                            id={"circuitoCon_" + pin.name}
                            r="2"
                            style={{fill:'white'}}
                        />
                    </g>
                )}
                )

        var res = (
            <svg width={formData.width} height={formData.height} xmlns="http://www.w3.org/2000/svg">
                <title>{formData.name}</title>
                
                <rect width={formData.width} height={formData.height} style={{fill:formData.color}} />
                <text x={5} y={10} fill="white">{formData.name}</text>
                
                <g id="Connectors">
                    {pins}
                </g>
            </svg>);
        console.log(res);
        this.setState({ resSVG: res });
        this.setState({ defaultSVG: formData }); // keep current data as starting point for redraw form

        console.log(this.state.svgRef);
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
				<Button bsStyle="primary" onClick={this.handleShow}>
					SVG Creator
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>SVG Creator</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					    <Well>
						 {this.state.resSVG}
						</Well>
						<Form 
							schema={svgSchema}
							uiSchema={svguiSchema}
							fields={{ typeahead: TypeaheadField }}
							onChange={ this.createSVG }
							formData={ this.state.defaultSVG }
						>
						    <Button type="submit" style={{ display: "none" }}>Create</Button>
						</Form>
						
						
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
						<Button>Download</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}
