import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";

import CardEditor from "../../components/cardEditor/CardEditor";

import { Draggable } from "react-beautiful-dnd";
import CardDetailModal from "../../components/cardDetails/CardDetails";

import { changeCardText, deleteCard } from "../../redux/actions/cards";

const Card = (props) => {
    const { card, index} = props;
    const [ text, setText ] = useState("");
    const [ hover, setHover ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ modalShow, setModalShow ] = useState(false);

    const startHover = () => setHover(true);
    const endHover = () => setHover(false);

    const startEditing = () => {
      setHover(false);
      setEditing(true);
      setText(props.card.text);
    };

    const endEditing = () => {
      setHover(false);
      setEditing(false);
    };

    const editCard = async text => {
      const { card, changeCardText } = props;
    
      endEditing();
    
      changeCardText({ 
        cardId: card._id, 
        cardText: text 
      });
    };
    
    const deleteCard = async () => {
      const { listId, card, deleteCard } = props;
    
      deleteCard({ 
        cardId: card._id, 
        listId 
      });
    };

    if (!editing) {
      return (
        <>
          <Draggable draggableId={card._id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="Card"
                onMouseEnter={startHover}
                onMouseLeave={endHover}
                onClick={() => setModalShow(true)}
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
            )}
          </Draggable>
          <CardDetailModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title={card.text}
            cardId={card._id}
            comments
          />
        </>
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
  card: state.cards[ownProps.cardId]
});

const mapDispatchToProps = {
  changeCardText,
  deleteCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);