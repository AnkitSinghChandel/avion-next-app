import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./ListDrag.css";

// Main ListDrag Component
const ListDrag = () => {
  const [listData, setListData] = useState([
    { id: "1", title: "React" },
    { id: "2", title: "JavaScript" },
    { id: "3", title: "Node.js" },
    { id: "4", title: "CSS" },
    { id: "5", title: "Ankit" },
    { id: "6", title: "Singh" },
    { id: "7", title: "Chandel" },
    { id: "8", title: "Ashu" },
    { id: "9", title: "Goel" },
    { id: "10", title: "Shalini" },
    { id: "11", title: "Ankur" },
    { id: "12", title: "Tyagi" },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const updatedItems = [...listData];

    const [movedItem] = updatedItems.splice(source.index, 1);

    updatedItems.splice(destination.index, 0, movedItem);

    setListData(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableArea listData={listData} />
    </DragDropContext>
  );
};

// DroppableArea Component
const DroppableArea = ({ listData }) => {
  return (
    <Droppable droppableId="dropId">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="my-list-wrapper"
        >
          <DraggableItems listData={listData} />

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

// DraggableItems Component
const DraggableItems = ({ listData }) => {
  return listData.map((item, index) => (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="drag-items"
            style={{
              background: snapshot.isDragging ? "#bfdbfe" : "#fff",
              ...provided.draggableProps.style,
            }}
          >
            {item.title}
          </div>
        );
      }}
    </Draggable>
  ));
};

export default ListDrag;
