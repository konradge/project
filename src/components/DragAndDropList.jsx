/*
  Liste, in der Elemente per Drag and Drop in der Reihenfolge verändert werden können
*/
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//Ordne nach Drag-and-Drop Array neu an
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function DragAndDropList(props) {
  return (
    <DragDropContext
      onDragEnd={result => {
        // Wurde außerhalb der Liste losgelassen
        if (!result.destination) {
          return;
        }

        //Ordne die Elemente in der neuen Ordnung an
        const items = reorder(
          props.items,
          result.source.index,
          result.destination.index
        );

        //Gebe Elternelement neue Ordnung durch
        props.onDragEnd(items.map(i => i.id));
      }}
    >
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.items.map((item, index) => (
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
