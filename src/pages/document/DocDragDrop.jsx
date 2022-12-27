import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "./reducer.js";
import { DispatchContext } from "./Doc.jsx";
import { useContext } from "react";
import Atom from "./Atom";
import { AddIcon } from "./Add.jsx";

export default function DocDragDrop() {
  const { atoms, dispatch } = useContext(DispatchContext);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const src = result.source.index;
    const dst = result.destination.index;
    dispatch(reorder(src, dst));
  };

  const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "0 8px",
    // width: 250,
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    // padding: 8 * 2,
    // margin: `0 0 8px 0`,
    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {atoms.map((item, index) => {
                let next = "";
                if (index < atoms.length - 1) {
                  next = atoms[index + 1].sid;
                }
                return (
                  <Draggable
                    key={index}
                    draggableId={String(index)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Atom atom={item} />
                        <AddIcon
                          prev={atoms[index].sid}
                          next={next}
                          index={index + 1}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
