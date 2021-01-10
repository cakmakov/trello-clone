import "./styles.css";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "../button/EditButtons";

const CardEditor = (props) => {
  const [ text, setText ] = useState(props.text || "");

  const handleChangeText = event => setText(event.target.value);

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };

  const { onSave, onCancel, onDelete, adding } = props;

  return (
    <div className="Edit-Card">
      <div className="Card">
        <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
      />
    </div>
  );
}

export default CardEditor;