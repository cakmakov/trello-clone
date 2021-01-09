import "./styles.css";

import React from "react";
import { connect } from "react-redux";

const Card = (props) => {
    const { card } = props;

    return <div className="Card">{card.text}</div>;
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);