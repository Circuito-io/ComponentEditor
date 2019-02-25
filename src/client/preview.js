import React from "react";
import { Modal, Button, Nav } from "react-bootstrap";
import { invoke_upload } from "./controller.js";
import { toast } from "react-toastify";

var previewURL = "";

export class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: false, modalMsg: "", previewURL: previewURL };

    this.onPreview = this.onPreview.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.getPreviewURL = this.getPreviewURL.bind(this);
  }

  componentDidMount() {
    if (!this.state.previewURL) {
      this.getPreviewURL();
    }
  }

  getPreviewURL() {
    fetch("/api/preview")
      .then(res => {
        res.json().then(data => {
          analytics.identify(data.userid);
          this.setState({ previewURL: data.endPoint });
          previewURL = data.endPoint;
        });
      })
      .catch(ex => {
        console.log("getPreviewURL failed", ex);
      });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onPreview(event) {
    {
      const toastId = toast.info("Upload in progress...", {
        autoClose: false
      });
      analytics.track("Preview Clicked");
      invoke_upload().then(res => {
        if (res && res.ok) {
          toast.update(toastId, {
            render: (
              <React.Fragment>
                Upload successful.
                <br />
                Refresh your active preview or <br />
                <Button
                  variant="success"
                  style={{ width: "100%" }}
                  onClick={event =>
                    window.open(this.state.previewURL, "_blank")
                  }
                >
                  Open a new preview
                </Button>
              </React.Fragment>
            ),
            type: toast.TYPE.SUCCESS,
            autoClose: 5000
          });
        } else {
          toast.update(toastId, {
            render:
              "Upload failed:" + ((res && res.statusText) || "can't connect"),
            type: toast.TYPE.ERROR,
            autoClose: 5000
          });

          if (res && res.status === 412) {
            // Precondition failed - validation errors
            res.text().then(text => {
              this.setState({ show: true, modalMsg: text });
            });
          } else {
            console.log(res);
          }
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validation errors, upload cancelled</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto"
            }}
            dangerouslySetInnerHTML={{ __html: this.state.modalMsg }}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="secondary" onClick={this.onPreview} style={{margin: "0px 2px"}}>
          Preview
        </Button>
      </React.Fragment>
    );
  }
}
