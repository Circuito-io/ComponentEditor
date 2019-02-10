import React from "react";

export function CustomTitleField(props) {
    const { id, title, required } = props;
    return (
      <legend id={id} className="form-legend">
        {title}
        {required && <span className="required">*</span>}
      </legend>
    );
  }