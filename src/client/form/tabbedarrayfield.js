import React from "react";
import { Tab, Nav, Button, Badge, Dropdown } from "react-bootstrap";

import {
  getDefaultFormState,
  getUiOptions,
  isFixedItems,
  allowAdditionalItems,
  retrieveSchema,
  toIdSchema,
  getDefaultRegistry
} from "react-jsonschema-form/lib/utils";
import PropTypes from "prop-types";
import { faTrashAlt, faClone, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArrayFieldTitle({ TitleField, idSchema, title, required }) {
  if (!title) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
}

function ArrayFieldDescription({ DescriptionField, idSchema, description }) {
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
}

function TabbedArrayItemContent(props) {
  return (
    <Tab.Pane eventKey={props.index}>
      <div className={props.className}>
        <div className="col-xs-12">{props.children}</div>

        {props.hasToolbar && (
          <div className="col-xs-3 array-item-toolbox">
            <div
              className="btn-group"
              style={{
                display: "flex",
                justifyContent: "space-around"
              }}
            />
          </div>
        )}
      </div>
    </Tab.Pane>
  );
}

function TabbedArrayFieldTemplate(props) {
  return (
    <fieldset className={props.className}>
      <ArrayFieldTitle
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.uiSchema["ui:title"] || props.title}
        required={props.required}
      />

      {(props.uiSchema["ui:description"] || props.schema.description) && (
        <ArrayFieldDescription
          DescriptionField={props.DescriptionField}
          idSchema={props.idSchema}
          description={
            props.uiSchema["ui:description"] || props.schema.description
          }
        />
      )}

      <Tab.Container
        id={`array-item-list-${props.idSchema.$id}`}
        defaultActiveKey={0}
        activeKey={props.activeKey}
        onSelect={eventKey => {
          if (eventKey == "+") {
            props.addItem();
          } else {
            props.onSelect(eventKey);
          }
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Nav variant="pills">
            {props.items &&
              props.items.map((p, index) => (
                <Nav.Item key={index}>
                  <Nav.Link eventKey={index}>{p.tabName}&nbsp;&nbsp;</Nav.Link>
                </Nav.Item>
              ))}
          </Nav>

          <Dropdown>
            <Dropdown.Toggle variant="secondary">More</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                disabled={props.disabled || props.readonly}
                onClick={props.addItem}
                eventKey={props.items.length}
              >
                <FontAwesomeIcon icon={faFile} />
                New Circuit
              </Dropdown.Item>
              <Dropdown.Item
                disabled={props.disabled || props.readonly}
                onClick={event => {
                  props.duplicateIndex(Number(props.activeKey));
                }}
              >
                <FontAwesomeIcon icon={faClone} />
                Duplicate Circuit
              </Dropdown.Item>
              <Dropdown.Item
                disabled={props.disabled || props.readonly}
                eventKey={
                  props.items.length > 1 ? Math.max(props.activeKey - 1, 0) : -1
                }
                onClick={event => {
                  props.dropIndex(Number(props.activeKey));
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Delete Circuit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Tab.Content>
          {props.items &&
            props.items.map((p, index) => (
              <TabbedArrayItemContent key={index} {...p} />
            ))}
          {props.items.length == 0 && (
            <TabbedArrayItemContent key={-1} index={-1}>
              No elements. Click 'More' to create a new one.
            </TabbedArrayItemContent>
          )}
          <Tab.Pane eventKey="+">Adding...</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </fieldset>
  );
}

export class TabbedArrayField extends React.Component {
  static defaultProps = {
    uiSchema: {},
    formData: [],
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false
  };

  get itemTitle() {
    const { schema } = this.props;
    return schema.items.title || schema.items.description || "Item";
  }

  componentDidUpdate(prevProps) {
    if (this.state.activeKey != -1 && this.props.formData.length == 0) {
      // when no elements in data key should be null
      this.setState({ activeKey: -1 });
    } else if (
      this.props.formData.length &&
      this.state.activeKey >= this.props.formData.length
    ) {
      // invalid activeKey after tab remove - update it
      this.setState({ activeKey: 0 });
    }
  }

  isItemRequired(itemSchema) {
    if (Array.isArray(itemSchema.type)) {
      // While we don't yet support composite/nullable jsonschema types, it's
      // future-proof to check for requirement against these.
      return !itemSchema.type.includes("null");
    }
    // All non-null array item types are inherently required by design
    return itemSchema.type !== "null";
  }

  canAddItem(formItems) {
    const { schema, uiSchema } = this.props;
    let { addable } = getUiOptions(uiSchema);
    if (addable !== false) {
      // if ui:options.addable was not explicitly set to false, we can add
      // another item if we have not exceeded maxItems yet
      if (schema.maxItems !== undefined) {
        addable = formItems.length < schema.maxItems;
      } else {
        addable = true;
      }
    }
    return addable;
  }

  addItem = () => {
    const { schema, formData, registry = getDefaultRegistry() } = this.props;
    const { definitions } = registry;
    let itemSchema = schema.items;
    if (isFixedItems(schema) && allowAdditionalItems(schema)) {
      itemSchema = schema.additionalItems;
    }
    this.props.onChange([
      ...formData,
      getDefaultFormState(itemSchema, undefined, definitions)
    ]);

    //this.onSelect(formData.length);
  };

  duplicateIndex = index => {
    const { formData, onChange } = this.props;

    if (formData.length > 0) {
      var newItem = Object.assign({}, formData[index]);
      newItem.name = newItem.name + "_copy";

      var newFormData = formData
        .slice(0, index + 1)
        .concat([newItem], formData.slice(index + 1));

      onChange(newFormData);
      this.onSelect(index + 1);
    }
  };

  dropIndex = index => {
    const { formData, onChange } = this.props;
    // refs #195: revalidate to ensure properly reindexing errors
    let newErrorSchema;
    if (this.props.errorSchema) {
      newErrorSchema = {};
      const errorSchema = this.props.errorSchema;
      for (let i in errorSchema) {
        i = parseInt(i);
        if (i < index) {
          newErrorSchema[i] = errorSchema[i];
        } else if (i > index) {
          newErrorSchema[i - 1] = errorSchema[i];
        }
      }
    }
    const newFormData = formData.filter((_, i) => i !== index);

    onChange(newFormData, newErrorSchema);
  };

  onChangeForIndex = index => {
    return (value, errorSchema) => {
      const { formData, onChange } = this.props;
      const newFormData = formData.map((item, i) => {
        // We need to treat undefined items as nulls to have validation.
        // See https://github.com/tdegrunt/jsonschema/issues/206
        const jsonValue = typeof value === "undefined" ? null : value;
        return index === i ? jsonValue : item;
      });
      onChange(
        newFormData,
        errorSchema &&
          this.props.errorSchema && {
            ...this.props.errorSchema,
            [index]: errorSchema
          }
      );
    };
  };
  constructor(props) {
    super(props);

    this.state = { activeKey: 0 };
    this.dropIndex = this.dropIndex.bind(this);
    this.duplicateIndex = this.duplicateIndex.bind(this);
  }

  onSelect = activeKey => {
    if (activeKey != null) this.setState({ activeKey });
  };

  render() {
    const {
      schema,
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      autofocus,
      registry = getDefaultRegistry(),
      onBlur,
      onFocus,
      idPrefix,
      rawErrors
    } = this.props;

    const title = schema.title === undefined ? name : schema.title;
    const { ArrayFieldTemplate, definitions, fields, formContext } = registry;
    const { TitleField, DescriptionField } = fields;
    const itemsSchema = retrieveSchema(schema.items, definitions);
    const arrayProps = {
      canAdd: this.canAddItem(formData),
      items: formData.map((item, index) => {
        const itemSchema = retrieveSchema(schema.items, definitions, item);
        const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
        const itemIdPrefix = idSchema.$id + "_" + index;
        const itemIdSchema = toIdSchema(
          itemSchema,
          itemIdPrefix,
          definitions,
          item,
          idPrefix
        );
        return this.renderArrayFieldItem({
          index,
          canMoveUp: index > 0,
          canMoveDown: index < formData.length - 1,
          itemSchema: itemSchema,
          itemIdSchema,
          itemErrorSchema,
          itemData: item,
          itemUiSchema: uiSchema.items,
          autofocus: autofocus && index === 0,
          onBlur,
          onFocus
        });
      }),
      className: `field field-array field-array-of-${itemsSchema.type}`,
      DescriptionField,
      disabled,
      idSchema,
      uiSchema,
      addItem: this.addItem,
      dropIndex: this.dropIndex,
      duplicateIndex: this.duplicateIndex,
      readonly,
      required,
      schema,
      title,
      TitleField,
      formContext,
      formData,
      rawErrors,
      onSelect: this.onSelect,
      activeKey: this.state.activeKey
    };

    // Check if a custom render function was passed in
    return <TabbedArrayFieldTemplate {...arrayProps} />;
  }

  renderArrayFieldItem(props) {
    const {
      index,
      canRemove = true,
      canMoveUp = true,
      canMoveDown = true,
      itemSchema,
      itemData,
      itemUiSchema,
      itemIdSchema,
      itemErrorSchema,
      autofocus,
      onBlur,
      onFocus,
      rawErrors
    } = props;
    const {
      disabled,
      readonly,
      uiSchema,
      registry = getDefaultRegistry()
    } = this.props;
    const {
      fields: { SchemaField }
    } = registry;
    const { orderable, removable } = {
      orderable: true,
      removable: true,
      ...uiSchema["ui:options"]
    };
    const has = {
      moveUp: orderable && canMoveUp,
      moveDown: orderable && canMoveDown,
      remove: removable && canRemove
    };
    has.toolbar = Object.keys(has).some(key => has[key]);

    const tabName = itemData.name ? itemData.name : "Tab " + (index + 1);

    return {
      children: (
        <SchemaField
          schema={itemSchema}
          uiSchema={itemUiSchema}
          formData={itemData}
          errorSchema={itemErrorSchema}
          idSchema={itemIdSchema}
          required={this.isItemRequired(itemSchema)}
          onChange={this.onChangeForIndex(index)}
          onBlur={onBlur}
          onFocus={onFocus}
          registry={this.props.registry}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          autofocus={autofocus}
          rawErrors={rawErrors}
        />
      ),
      className: "array-item",
      disabled,
      hasToolbar: has.toolbar,
      hasRemove: has.remove,
      index,
      readonly,
      tabName: tabName
    };
  }
}

if (process.env.NODE_ENV !== "production") {
  TabbedArrayField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    formData: PropTypes.array.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool
  };
}
