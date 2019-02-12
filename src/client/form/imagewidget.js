import React from "react";
import {
  FormGroup,
  InputGroup,
  Button,
  FormControl,
  Glyphicon
} from "react-bootstrap";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import urlJoin from "proper-url-join";

const CDN = "https://res.cloudinary.com/circuito/image/upload/";

const cloudinaryOptions = {
  cloud_name: "circuito",
  upload_preset: "voebp1io",
  multiple: false,
  sources: ["local"],
  resourceType: "image",
  allowedFormats: ["png", "jpeg", "svg"]
};

export function ImageWidget(props) {
  return (
    <InputGroup>
      <FormControl
        type="text"
        disabled={true}
        value={props.value}
        required={props.required}
        placeholder="https://"
        onChange={event => props.onChange(event.target.value)}
      />

      <InputGroup.Append>
        <Button
          disabled={!props.value}
          onClick={event => {
            if (props.value) window.open(props.value, "_blank");
          }}
        >
          Open
        </Button>
        <Button
          onClick={event => {
            ReactCloudinaryUploader.open(cloudinaryOptions)
              .then(image => {
                props.onChange(image.url);
              })
              .catch(err => {
                console.error(err);
              });
          }}
        >
          Upload...
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
