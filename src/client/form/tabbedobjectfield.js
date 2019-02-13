import React from "react";
import { Tabs, Tab, Card, Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
  getUiOptions
} from "react-jsonschema-form/lib/utils";
import NavbarToggle from "react-bootstrap/NavbarToggle";

function TabbedObjectFieldTemplate(props) {
  const { formData, schema, uiSchema } = props;

  var tabsSettings =
    (uiSchema["ui:options"] && uiSchema["ui:options"]["tabs"]) || {};

  var tabsNames = tabsSettings.map(tabSetting => tabSetting.name);

  var propsToTabs = {};

  tabsSettings.forEach(tabSetting =>
    tabSetting.props.forEach(prop => (propsToTabs[prop] = tabSetting.name))
  );

  var tabsProperties = {};

  props.properties.map(prop => {
    var targetTab = propsToTabs[prop.name];

    if (targetTab == null) {
      targetTab = "Undefined Tab";
    }

    if (!(targetTab in tabsProperties)) tabsProperties[targetTab] = [];

    tabsProperties[targetTab].push(prop);
  });

  const { TitleField, DescriptionField } = props;
  return (
    <fieldset>
      {(props.uiSchema["ui:title"] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema["ui:title"]}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      <Tab.Container defaultActiveKey={tabsNames[0]}>
        <Card>
          <Card.Header>
            <Nav variant="tabs">
              {tabsNames.map((tabName, index) => (
                <Nav.Item>
                  <Nav.Link eventKey={tabName}>{tabName}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              {tabsNames.map((tabName, index) => (
                <Tab.Pane eventKey={tabName}>
                  {tabsProperties[tabName].map(prop => prop.content)}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Card.Body>
          {/* <Tabs
            id={`${props.idSchema.$id}__tabs`}
            defaultActiveKey={tabsNames[0]}
          >
            {tabsNames.map((tabName, index) => (
              <Tab eventKey={tabName} title={tabName}>
                {tabsProperties[tabName].map(prop => prop.content)}
              </Tab>
            ))}
          </Tabs> */}
        </Card>
      </Tab.Container>
    </fieldset>
  );
}

export class TabbedObjectField extends React.Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false
  };

  state = {
    additionalProperties: {}
  };

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = name => {
    return (value, errorSchema) => {
      const newFormData = { ...this.props.formData, [name]: value };
      this.props.onChange(
        newFormData,
        errorSchema &&
          this.props.errorSchema && {
            ...this.props.errorSchema,
            [name]: errorSchema
          }
      );
    };
  };

  getAvailableKey = (preferredKey, formData) => {
    var index = 0;
    var newKey = preferredKey;
    while (formData.hasOwnProperty(newKey)) {
      newKey = `${preferredKey}-${++index}`;
    }
    return newKey;
  };

  onKeyChange = oldValue => {
    return (value, errorSchema) => {
      if (oldValue === value) {
        return;
      }
      value = this.getAvailableKey(value, this.props.formData);
      const newFormData = { ...this.props.formData };
      const newKeys = {
        [oldValue]: value
      };
      const keyValues = Object.keys(newFormData).map(key => {
        const newKey = newKeys[key] || key;
        return {
          [newKey]: newFormData[key]
        };
      });
      const renamedObj = Object.assign({}, ...keyValues);
      this.props.onChange(
        renamedObj,
        errorSchema &&
          this.props.errorSchema && {
            ...this.props.errorSchema,
            [value]: errorSchema
          }
      );
    };
  };

  getDefaultValue(type) {
    switch (type) {
      case "string":
        return "New Value";
      case "array":
        return [];
      case "boolean":
        return false;
      case "null":
        return null;
      case "number":
        return 0;
      case "object":
        return {};
      default:
        // We don't have a datatype for some reason (perhaps additionalProperties was true)
        return "New Value";
    }
  }

  handleAddClick = schema => () => {
    const type = schema.additionalProperties.type;
    const newFormData = { ...this.props.formData };
    newFormData[
      this.getAvailableKey("newKey", newFormData)
    ] = this.getDefaultValue(type);
    this.props.onChange(newFormData);
  };

  render() {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      idPrefix,
      onBlur,
      onFocus,
      registry = getDefaultRegistry()
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions, formData);
    const title = schema.title === undefined ? name : schema.title;
    const description = uiSchema["ui:description"] || schema.description;
    let orderedProperties;

    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: "red" }}>
            Invalid {name || "root"} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>{JSON.stringify(schema)}</pre>
        </div>
      );
    }

    const Template = TabbedObjectFieldTemplate;

    const templateProps = {
      title: uiSchema["ui:title"] || title,
      description,
      TitleField,
      DescriptionField,
      properties: orderedProperties.map(name => {
        return {
          content: (
            <SchemaField
              key={name}
              name={name}
              required={this.isRequired(name)}
              schema={schema.properties[name]}
              uiSchema={uiSchema[name]}
              errorSchema={errorSchema[name]}
              idSchema={idSchema[name]}
              idPrefix={idPrefix}
              formData={formData[name]}
              onKeyChange={this.onKeyChange(name)}
              onChange={this.onPropertyChange(name)}
              onBlur={onBlur}
              onFocus={onFocus}
              registry={registry}
              disabled={disabled}
              readonly={readonly}
            />
          ),
          name,
          readonly,
          disabled,
          required
        };
      }),
      required,
      idSchema,
      uiSchema,
      schema,
      formData,
      formContext
    };
    return <Template {...templateProps} onAddClick={this.handleAddClick} />;
  }
}

if (process.env.NODE_ENV !== "production") {
  TabbedObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired
    })
  };
}
