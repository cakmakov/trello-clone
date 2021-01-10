import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import ListEditor from "../listEditor/ListEditor";
import shortid from "shortid";
import EditButtons from "../button/EditButtons";

import { addList } from "../../redux/actions/lists";

const AddList = (props) => {
    const [ title, setTitle ] = useState("");

    const handleChangeTitle = e => setTitle(e.target.value);

    const createList = async () => {
        const { addList } = props;

        props.toggleAddingList();

        addList({ 
          listId: shortid.generate(), 
          listTitle: title 
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addList
}

export default connect(mapStateToProps, mapDispatchToProps)(AddList);