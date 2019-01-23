import React from "react";
import AceEditor from "react-ace";
import "brace/mode/c_cpp";
import "brace/theme/monokai";

export function AceEditorWidget(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className={classNames}>
    <AceEditor
      mode="c_cpp"
      theme="monokai"
      value={props.value}
      name={id}
      onChange={props.onChange}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      minLines={7}
      maxLines={7}
      editorProps={{$blockScrolling: true}}
    />
    </div>
  );
}