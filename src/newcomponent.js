import React from "react";
import { Button, Modal, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";

export class NewComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            componentName: ''
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    getValidationState() {
        const length = this.state.componentName.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({ componentName: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.handleShow}>
                    New Component
                </Button>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Create a New Component</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						
						<form>
                            <FormGroup
                                controlId="formBasicText"
                                validationState={this.getValidationState()}
                            >
                              <ControlLabel>Component name</ControlLabel>
                              <FormControl
                                type="text"
                                value={this.state.componentName}
                                placeholder="Enter name"
                                onChange={this.handleChange}
                              />
                              <FormControl.Feedback />
                              <HelpBlock>Choose a better name</HelpBlock>
                            </FormGroup>
                        </form>
					</Modal.Body>
					<Modal.Footer>
						<Button  onClick={this.handleClose}>Cancel</Button>
                        <Button bsStyle="primary">Create</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
        );
    }
}
