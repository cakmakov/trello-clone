import "./styles.css";

import React from "react";
import { connect } from "react-redux";

const List = (props) => {
    const { list } = props;

    return (
      <div className="List">
        <div className="List-Title" onClick={this.toggleEditingTitle}>
          {list.title}
        </div>
      </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);