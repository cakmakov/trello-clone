import "./styles.css";

import React, { useState} from "react";
import { connect } from "react-redux";

import List from "../list/List";
import AddList from "../../components/addList/AddList";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { moveList } from "../../redux/actions/board";
import { moveCard } from "../../redux/actions/lists";

const Board = (props) => {
    console.log(props);
    const { board } = props;
    const [ addingList, setAddingList ] = useState(false);

    const toggleAddingList = () => setAddingList(!addingList);

    const handleDragEnd = ({ source, destination, type }) => {
      // dropped outside the allowed zones
      if (!destination) return;
    
      const { moveList, moveCard } = props;
    
      // Move list
      if (type === "COLUMN") {
        // Prevent update if nothing has changed
        if (source.index !== destination.index) {
          moveList({
            oldListIndex: source.index,
            newListIndex: destination.index
          });
        }
        return;
      }

      // Move card
      if (
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
      ) {
        moveCard({
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        });
      }
    };

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board" ref={provided.innerRef}>
              {board.lists.map((listId, index) => {
                return <List listId={listId} key={listId} index={index} />;
              })}

              {provided.placeholder}

              <div className="Add-List">
                {addingList ? (
                  <AddList toggleAddingList={toggleAddingList} />
                ) : (
                  <div
                    onClick={toggleAddingList}
                    className="Add-List-Button"
                  >
                    <ion-icon name="add" /> Add a list
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
}

const mapStateToProps = state => ({ board: state.board });

const mapDispatchToProps = {
  moveList,
  moveCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);