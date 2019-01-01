import React from "react";
import { Button, Modal } from "react-bootstrap";
import { EditorForm } from "./editorform.js"
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/theme/monokai";

import { coderSchema, coderuiSchema } from "./coderSchema.js";

export class Coder extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		};
	}

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
					Edit Coder
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Coder Name</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<EditorForm 
							schema={coderSchema}
							uiSchema={coderuiSchema}
						/>
						Preview
						<AceEditor
							mode="java"
							theme="monokai"
							name="UNIQUE_ID_OF_DIV"
							editorProps={{ $blockScrolling: true }}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
