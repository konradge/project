import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class DragAndDropList extends Component {
  render() {
    return (
      <DragDropContext
        onDragEnd={result => {
          console.log(result);
          // dropped outside the list
          if (!result.destination) {
            return;
          }

          const items = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
          );

          this.props.onDragEnd(items.map(i => i.id));
        }}
      >
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.items.map((item, index) => (
                <Draggable
                  key={"" + item.id + index}
                  draggableId={"" + item.id + index}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragAndDropList;
