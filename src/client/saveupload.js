import React from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { invoke_upload } from "./controller.js";
import { toast } from 'react-toastify';

export function SaveUpload(props) {
    return (
        <NavItem onClick={event => {
            props.onSave();

            const toastId = toast.info("Upload in progress...", { autoClose: false });

            invoke_upload().then(response => {
                if (!response.ok) {
                    console.log(response);

                    toast.update(toastId, {
                        render: 'Upload failed:' + response.statusText,
                        type: toast.TYPE.ERROR,
                        autoClose: 5000
                    });
                }
                else {
                    toast.update(toastId, {
                        render: "Upload successful",
                        type: toast.TYPE.SUCCESS,
                        autoClose: 5000
                    });
                }
            });
        }
        }
        ><Glyphicon glyph="glyphicon-refresh" />Save & Upload</NavItem>
    );
}
