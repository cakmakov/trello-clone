import "./styles.css";

import React, { useState } from "react";
import { connect } from "react-redux";

import Card from "../card/Card";
import CardEditor from "../../components/cardEditor/CardEditor";
import ListEditor from "../../components/listEditor/ListEditor";

import shortid from "shortid";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { addCard, changeListTitle, deleteList } from "../../redux/actions/lists";

const List = (props) => {
    const { list, index } = props;
    const [ editingTitle, setEditingTitle ] = useState(false);
    const [ title, setTitle ] = useState(list.title);
    const [ addingCard, setAddingCard ] = useState(false);

    const toggleAddingCard = () => setAddingCard(!addingCard);

    const addCard = async cardText => {
      const { listId, addCard } = props;

      toggleAddingCard();

      const cardId = shortid.generate();

      addCard({ 
        cardText, 
        cardId, 
        listId 
      });
    };

    const toggleEditingTitle = () => setEditingTitle(!editingTitle);

    const handleChangeTitle = e => setTitle(e.target.value);

    const editListTitle = async () => {
      const { listId, changeListTitle } = props;

      toggleEditingTitle();

      changeListTitle({ 
        listId, 
        listTitle: title 
      });
    };

    const deleteList = async () => {
      const { listId, list, deleteList } = props;

      deleteList({ 
        listId, 
        cards: list.cards 
      });
    };

    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={handleChangeTitle}
                saveList={editListTitle}
                onClickOutside={editListTitle}
                deleteList={deleteList}
              />
            ) : (
              <div className="List-Title" onClick={toggleEditingTitle}>
                {list.title}
              </div>
            )}

            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef}>
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list._id}
                        listTitle={list.title}
                      />
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

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
        )}
      </Draggable>
    );
}

const mapStateToProps = (state, ownProps) => ({
  list: state.lists[ownProps.listId]
});

const mapDispatchToProps = {
  addCard,
  changeListTitle,
  deleteList
}

export default connect(mapStateToProps, mapDispatchToProps)(List);