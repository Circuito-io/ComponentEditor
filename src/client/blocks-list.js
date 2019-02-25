import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";
import { ListGroup, Button } from "react-bootstrap";
import { update_a_block, update_a_coder } from "./controller.js";
import { createNewCoder } from "./form/coderfield.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "react-bootstrap-dialog";

function createNewBlockData(blockName) {
  var blockId = Math.floor(Math.random() * 5000 + 5000);
  console.log("Creating blockId", blockId, "for", blockName);
  return {
    name: blockName,
    blockId: blockId.toString(),
    app: {
      appName: blockName,
      visible: true,
      indicators: {
        solder: false
      },
      desc: "<p></p>"
    },
    circuits: [{ name: "default", cost: 0, coders: [blockName] }]
  };
}

function MenuOption(props) {
  return (
    <div
      style={{
        height: 45,
        verticalAlign: "middle"
      }}
      key={props.id}
    >
      <span style={{ width: 45, display: "inline-block" }}>
        <img
          src={
            (props.img &&
              props.img.replace("/image/upload/", "/image/upload/h_42/")) ||
            "https://www.circuito.io/static/images/component-default-image-blue.svg"
          }
          height={42}
        />
      </span>
      {props.label}
    </div>
  );
}

export class BlocksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: "" };

    this.createBlock = this.createBlock.bind(this);
  }

  createBlock() {
    this.dialog.show({
      body: "New block name",
      prompt: Dialog.TextPrompt(),
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(dialog => {
          const newBlockName = dialog.value;

          analytics.track("Block Created", { name: newBlockName });
          analytics.track("Block Opened", { name: newBlockName });

          update_a_block(newBlockName, createNewBlockData(newBlockName))
            .then(res => {
              if (!(res && res.ok))
                toast.error(
                  "Create block failed:" +
                    ((res && res.statusText) || "can't connect")
                );
              else {
                return update_a_coder(
                  newBlockName,
                  createNewCoder(newBlockName)
                );
              }
            })
            .then(res => {
              if (!(res && res.ok))
                toast.error(
                  "Create coder for block failed:" +
                    ((res && res.statusText) || "can't connect")
                );
              else {
                toast.success("Created " + newBlockName, {
                  autoClose: 2000
                });
                this.props.refreshData();
                this.props.onBlockSelected(newBlockName);
              }
            });
        })
      ]
    });
  }

  render() {
    var blocksIdsLabels = this.props.cachedData.blocksData.map(block => {
      var appName = block["app.appName"];
      return {
        id: block.name,
        label: (appName && `${block.name} - ${appName}`) || block.name,
        img: block["app.image"]
      };
    });

    return (
      <React.Fragment>
        <Button style={{ width: "100%" }} onClick={this.createBlock}>
          Create New Block
        </Button>
        <br />
        <br />
        <Typeahead
          options={blocksIdsLabels}
          selectHintOnEnter={true}
          emptyLabel={false}
          onInputChange={input => {
            this.setState({ input });
          }}
          onChange={selection => {
            analytics.track("Block Opened", { name: selection[0].id });
            this.props.onBlockSelected(selection[0].id);
          }}
          bsSize={"small"}
          open
          maxHeight="400px"
          menuId="main-block-list"
          placeholder="Or choose a block to edit..."
          renderMenuItemChildren={(option, props, index) => (
            <MenuOption {...option} />
          )}
        />

        <Dialog
          ref={el => {
            this.dialog = el;
          }}
        />
      </React.Fragment>
    );
  }
}
