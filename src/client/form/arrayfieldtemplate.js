import React from "react";
import { Button, Card } from "react-bootstrap";
import {
  faTrashAlt,
  faAngleUp,
  faAngleDown,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ArrayFieldTemplate(props) {
  const {
    DescriptionField,
    TitleField,
    schema,
    title,
    id,
    className,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onBlur,
    onFocus,
    onChange
  } = props;

  return (
    <div id={id} className={className}>
      {title && <TitleField title={required ? title + "*" : title} />}
      {schema.description && (
        <DescriptionField description={schema.description} />
      )}
      {props.items.map(element => (
        <Card key={element.index}>
          <Card.Body>{element.children}</Card.Body>
          <Card.Footer className="text-right">
            {element.hasMoveUp && (
              <Button
                variant="outline-secondary"
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}
              >
                <FontAwesomeIcon icon={faAngleUp} />
              </Button>
            )}
            {element.hasMoveDown && (
              <Button
                variant="outline-secondary"
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            )}
            <Button
              variant="outline-danger"
              onClick={element.onDropIndexClick(element.index)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Card.Footer>
        </Card>
      ))}
      <div className="text-right">
        {props.canAdd && (
          <Button variant="outline-secondary" onClick={props.onAddClick}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </div>
    </div>
  );
}

