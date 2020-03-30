import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import { SVGCreator } from "./svg-creator";

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
      {props.options && props.options.svgcreator && (
        <InputGroup.Prepend>
          <SVGCreator />
        </InputGroup.Prepend>
      )}

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
          variant="outline-secondary"
          disabled={!props.value}
          onClick={event => {
            if (props.value) window.open(props.value, "_blank");
          }}
        >
          Open
        </Button>
        <Button
          variant="outline-secondary"
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
