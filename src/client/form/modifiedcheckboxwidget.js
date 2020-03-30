import React from "react";
import PropTypes from "prop-types";

function ModifiedCheckboxWidget(props) {
  const {
    schema,
    id,
    registry,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onBlur,
    onFocus,
    onChange
  } = props;

  // Modified to get DescriptionField from registry 
  const { fields } = registry;
  const { DescriptionField } = fields;

  return (
    <div className={`checkbox ${disabled || readonly ? "disabled" : ""}`}>
      <label>
        <input
          type="checkbox"
          id={id}
          checked={typeof value === "undefined" ? false : value}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={event => onChange(event.target.checked)}
          onBlur={onBlur && (event => onBlur(id, event.target.checked))}
          onFocus={onFocus && (event => onFocus(id, event.target.checked))}
        />
        <span>{label}</span>
      </label>
      {schema.description && (
        <DescriptionField description={schema.description} />
      )}
    </div>
  );
}

ModifiedCheckboxWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  ModifiedCheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default ModifiedCheckboxWidget;
