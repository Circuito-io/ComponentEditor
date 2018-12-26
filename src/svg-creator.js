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
            show: false,
            resSVG: '',
            defaultSVG: {
                name: "Demo Symbol",
                width: 100, 
                height: 150,
                color: '#8A231E',
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
                var spacing = 7.2;
                var x = 10+spacing*index;
                var y = formData.height-10;

                var textx = x+spacing/2;
                var texty = y-5;
                
                var pinShape =''
                if (formData.pinTypes == "pads")
                    pinShape = (
                    <circle 
                        cx={x}
                        cy={y}
                        data-cir-type={pin.type}
                        id={"circuitoCon_" + pin.name}
                        r="2.05" 
                        style={{fill:'none', stroke:'#e8e5de', 'stroke-miterlimit':10}}
                    />);
                else
                    pinShape = (
                        <g transform={`translate(${x-4} ${y-4})`}>
                            <polygon points="5.77 0 7.2 1.53 7.2 5.77 5.77 7.2 1.54 7.2 0 5.77 0 1.53 1.54 0 5.77 0"></polygon>
                            <rect x="2.69" y="3.6" width="2.27" height="18.75"></rect>
                            <rect id={"circuitoCon_" + pin.name} x="2.69" y="20.08" width="2.27" height="2.27"></rect>
                        </g>
                        );
                
                return (
                    <g>
                        <text
                            x={textx}
                            y={texty}
                            fill="white"
                            style={{'font-family':'monospace', 'font-size':10}}
                            transform={`rotate(-90,${textx},${texty})`}
                        >
                            {pin.name}
                        </text>
                        {pinShape}
                    </g>
                )}
                )

        var res = (
            <svg width={formData.width} height={formData.height} xmlns="http://www.w3.org/2000/svg">
                <title>{formData.name}</title>
                <rect width={formData.width} height={formData.height} style={{fill:formData.color}} />
                <text 
                    x={5}
                    y={10}
                    fill="white"
                    style={{'font-family':'monospace', 'font-size':10}}
                >
                    {formData.name}
                </text>
                
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
