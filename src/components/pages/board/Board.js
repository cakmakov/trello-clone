import "./styles.css";

import React, { useState} from "react";
import { connect } from "react-redux";

import List from "../list/List";
import AddList from "../addList/AddList";

const Board = (props) => {
    const { board } = props;
    const { addingList, setAddingList } = useState(false);

    const toggleAddingList = () => setAddingList(!addingList);

    return (
      <div className="Board">
        {board.lists.map((listId, index) => {
          return <List listId={listId} key={listId} index={index} />;
        })}
        <div className="Add-List">
          {addingList ? (
            <AddList toggleAddingList={toggleAddingList} />
          ) : (
            <div onClick={toggleAddingList} className="Add-List-Button">
              <ion-icon name="add" /> Add a list
            </div>
          )}
        </div>
      </div>
    );
}

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Board);