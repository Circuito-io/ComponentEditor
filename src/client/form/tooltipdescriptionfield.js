import React from "react";
import remark from "remark";
//import { recommended } from "remark-preset-lint-recommended";
import html from "remark-html";
import { docs } from "../docs";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var reDocsKey = new RegExp("{{(.*)}}");

export const TooltipDescriptionField = ({ id, description }) => {
  var descText = description ? description : "";

  var docKeyMatch = reDocsKey.exec(descText);

  if (docKeyMatch) {
    // {{key}} style description - fetch key from docs
    var docKey = docKeyMatch[1];
    var doc = docs[docKey];
    var docImg = (doc && doc.img) || "";
    var docText = (doc && doc.text) || `error: doc key ${docKey} not found`;
    var imgTag =
      docImg &&
      `<br/><br/><img src="/docs/imgs/${docImg}" class="tooltip-img"/>`;

    var docHTML = remark()
      .use(html)
      .processSync(docText);

    return (
      <div className="tooltip-hint" id={id} data-tip={`${docHTML}${imgTag}`}>
        <a>
          <FontAwesomeIcon icon={faInfoCircle} />
        </a>
        <br />
      </div>
    );
  } else {
    // otherwise display normal description
    return <div id={id}>{descText}</div>;
  }
};
