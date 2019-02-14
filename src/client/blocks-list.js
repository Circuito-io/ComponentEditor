import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";
import { update_a_block } from "./controller.js";

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
      }
    },
    circuits: [{ name: "default", cost: 0 }]
  };
}

export class BlocksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var blocksIdsLabels = this.props.cachedData.blocksData.map(block => {
      var appName = block["app.appName"];
      return {
        id: block.name,
        label: (appName && `${block.name} - ${appName}`) || block.name
      };
    });

    return (
      <Typeahead
        options={blocksIdsLabels}
        selectHintOnEnter={true}
        allowNew={true}
        newSelectionPrefix="Create new block:"
        onChange={selection => {
          if (
            selection[0] &&
            typeof selection[0] === "object" &&
            "customOption" in selection[0]
          ) {
            // clicked create new
            var newBlockName = selection[0].label;

            update_a_block(newBlockName, createNewBlockData(newBlockName)).then(
              res => {
                if (!(res && res.ok))
                  toast.error(
                    "Create block failed:" +
                      ((res && res.statusText) || "can't connect")
                  );
                else {
                  toast.success("Created " + newBlockName, {
                    autoClose: 2000
                  });
                  this.props.refreshData();
                  this.props.onBlockSelected(newBlockName);
                }
              }
            );
          } else {
            this.props.onBlockSelected(selection[0].id);
          }
        }}
        bsSize={"small"}
        placeholder="Choose a block to edit or enter name to create a new one..."
      />
    );
  }
}
