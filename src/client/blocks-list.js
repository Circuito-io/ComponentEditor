import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";
import { ListGroup } from "react-bootstrap";
import { update_a_block, update_a_coder } from "./controller.js";
import { createNewCoder } from "./form/coderfield.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        {props.img && (
          <img
            src={props.img.replace("/image/upload/", "/image/upload/h_42/")}
          />
        )}
      </span>
      {props.label}
    </div>
  );
}

export class BlocksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: "" };
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
          placeholder="Choose a block to edit or enter name to create a new one..."
          renderMenuItemChildren={(option, props, index) => (
            <MenuOption {...option} />
          )}
        />

        <ListGroup>
          <ListGroup.Item
            disabled={
              this.state.input === "" ||
              this.props.cachedData.blocks.includes(this.state.input)
            }
            action
            onClick={event => {
              // clicked create new
              var newBlockName = this.state.input;

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
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ width: "45px" }} />
            Create new block: &nbsp;
            <span>
              <b>{this.state.input || "Enter name"}</b>
            </span>
          </ListGroup.Item>
        </ListGroup>
      </React.Fragment>
    );
  }
}
