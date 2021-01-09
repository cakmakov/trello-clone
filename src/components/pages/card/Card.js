import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";

import CardEditor from "../cardEditor/CardEditor";

const Card = (props) => {
    const { card } = props;
    const { text, setText } = useState("");
    const { hover, setHover } = useState(false);
    const { editing, setEditing } = useState(false);

    const startHover = () => setHover(true);
    const endHover = () => setHover(false);

    const startEditing = () => {
      setHover(false);
      setEditing(true);
      setText(props.card.text);
    }

    const endEditing = () => this.setState({ hover: false, editing: false });

    const editCard = async text => {
      const { card, dispatch } = props;
    
      endEditing();
    
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: { cardId: card._id, cardText: text }
      });
    };
    
    const deleteCard = async () => {
      const { listId, card, dispatch } = props;
    
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
    };

    if (!editing) {
      return (
        <div
          className="Card"
          onMouseEnter={startHover}
          onMouseLeave={endHover}
        >
          {hover && (
            <div className="Card-Icons">
              <div className="Card-Icon" onClick={startEditing}>
                <ion-icon name="create" />
              </div>
            </div>
          )}
          {card.text}
        </div>
      );
    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={editCard}
          onDelete={deleteCard}
          onCancel={endEditing}
        />
      );
    }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);