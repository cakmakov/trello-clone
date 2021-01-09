import "./styles.css";

import React from "react";
import { connect } from "react-redux";

import List from "../list/List";

const Board = (props) => {
    const { board } = props;

    return (
      <div className="Board">
        {board.lists.map((listId, index) => {
          return <List listId={listId} key={listId} index={index} />;
        })}
      </div>
    );
}

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Board);