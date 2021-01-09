import "./styles.css";

import React from "react";
import { connect } from "react-redux";

const Board = (props) => {
    const { board } = props;

    return (
      <div className="Board">
        {board.lists.map((listId, index) => {
            
        })}
      </div>
    );
}

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Board);