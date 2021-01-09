import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";

import Card from "../card/Card";
import CardEditor from "../cardEditor/CardEditor";

import shortid from "shortid";

const List = (props) => {
    const { list } = props;
    const { addingCard, setAddingCard } = useState(false);

    const toggleAddingCard = () => setAddingCard(!addingCard);

    const addCard = async cardText => {
      const { listId, dispatch } = props;

      toggleAddingCard();

      const cardId = shortid.generate();

      dispatch({
        type: "ADD_CARD",
        payload: { cardText, cardId, listId }
      });
    };

    return (
      <div className="List">
        <div className="List-Title">
          {list.title}
        </div>

        {list.cards &&
          list.cards.map((cardId, index) => (
            <Card
              key={cardId}
              cardId={cardId}
              index={index}
              listId={list._id}
            />
          ))}

        {addingCard ? (
          <CardEditor
            onSave={addCard}
            onCancel={toggleAddingCard}
            adding
          />
        ) : (
          <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
            <ion-icon name="add" /> Add a card
          </div>
        )}
      </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);