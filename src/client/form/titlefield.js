import React from "react";

export function CustomTitleField(props) {
    const { id, title, required } = props;
    return (
      <div id={id} className="h4 form-legend">
        {title}
        {required && <span className="required">*</span>}
      </div>
    );
  }