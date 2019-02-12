import React from "react";
import Form from "react-jsonschema-form";
import { Button, Modal, Well } from "react-bootstrap";
import { TypeaheadField } from "./form/react-jsonschema-form-extras/TypeaheadField";
import { svgSchema, svguiSchema } from "./schema/svg-creatorSchema.js";

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}




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
                name: "ADXL335",
                width: 15.25, 
                height: 17.75,
                color: '#cf2f27',
                pins: [
                    { name: "ST", type: "male" },
                    { name: "Z", type: "male" },
                    { name: "Y", type: "male" },
                    { name: "X", type: "male" },
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
        var pinsInRect = '';
        var pins = '';
        var lastPinLocation = 0;
        if (formData.pins != null)
            pins = formData.pins.map((pin, index) => { 
                var r = 2.05
                var spacing = 7.2;
                var x = 3.5 + spacing * index;
                var y = formData.height * 72 /25.4 - spacing + 2 * r - 1;

                var textx = x+(spacing - 3)/2;
                var texty = y-5;
                
                lastPinLocation = Math.max(x + spacing / 2, lastPinLocation)
                
                var pinShape =''
                if (formData.pinTypes == "pads")
                {
                    pinShape = (
                    <circle 
                        cx={x}
                        cy={y}
                        data-cir-type={pin.type}
                        id={"circuitoCon_" + pin.name}
                        r={r}
                        style={{fill:'none', stroke:'#b3b3b3', 'stroke-miterlimit':10}}
                    />);
                    pinsInRect += `M ${x}, ${y} m -${r}, 0 a ${r},${r} 0 1,0 ${r*2},0 a ${r},${r} 0 1,0 -${r*2},0 `
                }
                else
                {
                    pinShape = (
                        <g transform={`translate(${x-3.5} ${y-3.5})`}>
                            <polygon points="5.77 0 7.2 1.53 7.2 5.77 5.77 7.2 1.54 7.2 0 5.77 0 1.53 1.54 0 5.77 0"></polygon>
                            <rect x="2.69" y="3.6" width="2.27" height="18.75" fill="#b3b3b3"></rect>
                           
                            <rect id={"circuitoCon_" + pin.name} data-cir-type={pin.type} x="2.69" y={16.06} width="2.27" height="2.27" fill="none"></rect>
                         </g>
                        );
                
                }
                return (
                    <g>
                        <text
                            x={textx}
                            y={texty}
                            fill="white"
                            style={{'font-family':'monospace', 'font-size':6}}
                            transform={`rotate(-90,${textx},${texty})`}
                        >
                            {pin.name}
                        </text>
                        {pinShape}
                    </g>
                )}
                )
        
        var height = formData.height
        var viewBox ='';
        var rect = '';
        if(pinsInRect)
        {
            var rectPath = `M 0 0 H ${formData.width * 72 /25.4} V ${formData.height * 72 /25.4}  H 0 ` + pinsInRect + 'z';
            rect =  <path d={rectPath} style={{fill:formData.color}} />;
            
            viewBox = '0 0 ' +  formData.width * 72 /25.4 + ' ' + formData.height * 72 /25.4;
            
        }
        // if headers was chosen, create the component body <rect>, viewBox and change the SVG height accordingly 
        else
        {
            rect = <rect width={formData.width * 72 /25.4} height={formData.height * 72 /25.4} style={{fill:formData.color}} />;
            height = formData.height+ 3.5
            viewBox = '0 0 ' +  formData.width * 72 /25.4 + ' ' + height * 72 /25.4;
        }
        
        
        
        // check board width includes all pins, if not extend board
        if (lastPinLocation > formData.width * 72 /25.4)
        {
            formData.width = (lastPinLocation * 25.4 /72).toFixed(2);
        }
        
        
        
        
        
        var res = (
            <svg width={formData.width + 'mm'} height={height + 'mm'} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={{width: "30%", height: "30%", margin: "auto"}}>
                <title>{formData.name}</title>
                <g>
                {rect}
                </g>
                <text 
                    x={5}
                    y={10}
                    fill="white"
                    style={{'font-family':'monospace', 'font-size':8}}
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
					    <Well style={{display: "flex"}}>
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
                        <button>Download</button>
						
						
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}
