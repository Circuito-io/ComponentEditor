import { ImageWidget } from "./ImageWidget";

// Using FireReaderInput instead of cloudinary:
// import FileReaderInput from "react-file-reader-input";
// <FileReaderInput
// as="url"
// id="img-file-input"
// onChange={(e, results) => {
// 	var filename = results[0][1].name;
// 	props.onChange(filename);
// }}
// >
// <Button>Upload...</Button>
// </FileReaderInput>

export const blockuiSchema = {
  visible: {
    "ui:help": "List block in circuito app"
  },
  desc: {
    "ui:field": "rte",
    rte: {
      format: "html"
    }
  },
  buildSetupText: {
    "ui:widget": "textarea"
  },
  buildTestText: {
    "ui:widget": "textarea"
  },
  tags: {
    "ui:field": "typeahead",
    typeahead: {
      options: ["Controller", "Power supply", "Support"],
      minLength: 0,
      multiple: true
    }
  },
  notes: {
    "ui:widget": "textarea",
    "ui:placeholder": "Changelog",
    "ui:help": "Describe any modification you made in a new line",
    "ui:options": {
      rows: 7
    }
  },
  img: {
    "ui:widget": ImageWidget
  }
};

export const blockSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    blockid: {
      type: "string"
    },
    visible: {
      type: "boolean"
    },
    category: {
      type: "string",
      enum: ["output", "input", "controller", "power", "support"]
    },
    desc: {
      type: "string"
    },
    tags: {
      type: "string"
    },
    img: {
      type: "string"
    },
    notes: {
      type: "string"
    }
  }
};
