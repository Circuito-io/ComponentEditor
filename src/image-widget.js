import React from "react";
import { FormGroup, InputGroup, Button, FormControl } from "react-bootstrap";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";

const cloudinaryOptions = {
  cloud_name: "circuito",
  upload_preset: "voebp1io",
  multiple: false,
  returnJustUrl: true,
  sources: ["local"],
  resourceType: "image",
  allowedFormats: ["png", "jpeg", "svg"]
};

export function ImageWidget(props) {
  return (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          disabled={true}
          value={props.value}
          required={props.required}
          placeholder="https://"
          onChange={event => props.onChange(event.target.value)}
        />

        <InputGroup.Button>
          <Button
            onClick={event => {
              console.log("click");
              ReactCloudinaryUploader.open(cloudinaryOptions)
                .then(image => {
                  console.log("image", image);
                  props.onChange(image);
                })
                .catch(err => {
                  console.error(err);
                });
            }}
          >
            Upload...
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  );
}
