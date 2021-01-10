import "./styles.css";

import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = (props) => {
  const ref = useRef();

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.saveList();
    }
  };

  const handleClick = e => {
    const node = ref.current;

    if (node.contains(e.target)) {
      return;
    }

    props.onClickOutside();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
  
    // returned function will be called on component unmount 
    return () => {
        document.removeEventListener("click", handleClick, false);
    }
  });

  const { title, handleChangeTitle, deleteList } = props;

  return (
    <div className="List-Title-Edit" ref={this.ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <ion-icon name="trash" onClick={deleteList} />}
    </div>
  );
}

export default ListEditor;