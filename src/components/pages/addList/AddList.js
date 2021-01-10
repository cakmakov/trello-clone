import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import ListEditor from "../listEditor/ListEditor";
import shortid from "shortid";
import EditButtons from "../button/EditButtons";

const AddList = (props) => {
    const [ title, setTitle ] = useState("");

    const handleChangeTitle = e => setTitle(e.target.value);

    const createList = async () => {
        const { dispatch } = props;

        props.toggleAddingList();

        dispatch({
        type: "ADD_LIST",
        payload: { listId: shortid.generate(), listTitle: title }
        });
    };

    const { toggleAddingList } = props;

    return (
      <div className="Add-List-Editor">
        <ListEditor
          title={title}
          handleChangeTitle={handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={createList}
        />

        <EditButtons
          handleSave={createList}
          saveLabel={"Add list"}
          handleCancel={toggleAddingList}
        />
      </div>
    );  
}

export default connect()(AddList);