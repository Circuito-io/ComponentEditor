import React from "react";
import { EditorForm } from "./editorform";
import { Button, Modal, Card } from "react-bootstrap";
import { svgSchema, svguiSchema } from "../schema/svg-creatorSchema.js";

const defaultData = {
  name: "ADXL335",
  width: 15.25,
  height: 17.75,
  color: "#CF2F27",
  pins: [
    { name: "ST", type: "male" },
    { name: "Z", type: "male" },
    { name: "Y", type: "male" },
    { name: "X", type: "male" },
    { name: "GND", type: "male" },
    { name: "VCC", type: "male" }
  ]
};
export class SVGCreator extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createSVG = this.createSVG.bind(this);

    this.state = {
      show: false,
      resSVG: "",
      currentData: null,
      svgRef: null
    };
  }

  createSVG(form) {
    var formData = form.formData;

    if (form.errors.length > 0) return;

    var pinsInRect = "";
    var pins = "";
    var lastPinLocation = 0;
    if (formData.pins != null)
      pins = formData.pins.map((pin, index) => {
        if (pin.name) {
          var r = 2.05;
          var spacing = 7.2;
          var x = 3.5 + spacing * index;
          var y = (formData.height * 72) / 25.4 - spacing + 2 * r - 1;

          var textx = x + (spacing - 3) / 2;
          var texty = y - 5;

          lastPinLocation = Math.max(x + spacing / 2, lastPinLocation);

          var pinShape = "";
          if (formData.pinTypes == "pads") {
            pinShape = (
              <circle
                cx={x}
                cy={y}
                data-cir-type={pin.type}
                id={"circuitoCon_" + pin.name}
                r={r}
                style={{
                  fill: "none",
                  stroke: "#b3b3b3",
                  strokeMiterlimit: 10
                }}
              />
            );
            pinsInRect += `M ${x}, ${y} m -${r}, 0 a ${r},${r} 0 1,0 ${r *
              2},0 a ${r},${r} 0 1,0 -${r * 2},0 `;
          } else {
            pinShape = (
              <g transform={`translate(${x - 3.5} ${y - 3.5})`}>
                <polygon points="5.77 0 7.2 1.53 7.2 5.77 5.77 7.2 1.54 7.2 0 5.77 0 1.53 1.54 0 5.77 0" />
                <rect
                  x="2.69"
                  y="3.6"
                  width="2.27"
                  height="18.75"
                  fill="#b3b3b3"
                />

                <rect
                  id={"circuitoCon_" + pin.name}
                  data-cir-type={pin.type}
                  x="2.69"
                  y={16.06}
                  width="2.27"
                  height="2.27"
                  fill="none"
                />
              </g>
            );
          }
          return (
            <g key={index}>
              <text
                x={textx}
                y={texty}
                fill="white"
                style={{ fontFamily: "monospace", fontSize: 6 }}
                transform={`rotate(-90,${textx},${texty})`}
              >
                {pin.name}
              </text>
              {pinShape}
            </g>
          );
        }
      });

    var height = formData.height;
    var width = Math.max(formData.width, (lastPinLocation * 25.4) / 72); //check board width includes all pins, if not extend board

    var viewBox = "";
    var rect = "";
    if (pinsInRect) {
      var rectPath =
        `M 0 0 H ${(width * 72) / 25.4} V ${(height * 72) / 25.4}  H 0 ` +
        pinsInRect +
        "z";
      rect = <path d={rectPath} style={{ fill: formData.color }} />;

      viewBox = "0 0 " + (width * 72) / 25.4 + " " + (height * 72) / 25.4;
    }
    // if headers was chosen, create the component body <rect>, viewBox and change the SVG height accordingly
    else {
      rect = (
        <rect
          width={(width * 72) / 25.4}
          height={(height * 72) / 25.4}
          style={{ fill: formData.color }}
        />
      );
      height = height + 3.5;
      viewBox = "0 0 " + (width * 72) / 25.4 + " " + (height * 72) / 25.4;
    }

    var res = (
      <svg
        ref={ref => {
          this.setState({ svgRef: ref });
        }}
        width={width.toFixed(2) + "mm"}
        height={height + "mm"}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "30%", height: "30%", margin: "auto" }}
      >
        <title>{formData.name}</title>
        <g>{rect}</g>
        <text
          x={5}
          y={10}
          fill="white"
          style={{ fontFamily: "monospace", fontSize: 8 }}
        >
          {formData.name}
        </text>

        <g id="Connectors">{pins}</g>
      </svg>
    );
    // keep current data as starting point for redraw form
    this.setState({
      svgElement: res,
      currentData: formData,
      svgName: formData.name
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ currentData: defaultData, show: true });
  }

  render() {
    return (
      <React.Fragment>
        <Button variant="outline-secondary" onClick={this.handleShow}>
          SVG Creator
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>SVG Creator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card body style={{ display: "flex" }}>
              {this.state.svgElement}
            </Card>
            <EditorForm
              schema={svgSchema}
              uiSchema={svguiSchema}
              onChange={this.createSVG}
              formData={this.state.currentData}
            >
              <Button type="submit" style={{ display: "none" }}>
                Create
              </Button>
            </EditorForm>
          </Modal.Body>
          <Modal.Footer>
            <a
              className="btn btn-primary"
              download={`${this.state.svgName || "File"}.svg`}
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                this.state.svgRef && this.state.svgRef.outerHTML
              )}`}
            >
              Download
            </a>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
