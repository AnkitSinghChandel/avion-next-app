import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./ListDrag.css";

// Main ListDrag Component
const ListDrag2 = () => {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "Todo",
      tasks: [
        { id: "1", title: "React" },
        { id: "2", title: "JavaScript" },
        { id: "3", title: "HTML" },
        { id: "4", title: "Git & GitHub" },
        { id: "5", title: "TypeScript" },
        { id: "6", title: "Redux Toolkit" },
      ],
    },
    {
      id: "progress",
      title: "Progress",
      tasks: [
        { id: "7", title: "Node.js" },
        { id: "8", title: "Express.js" },
        { id: "9", title: "MongoDB" },
        { id: "10", title: "API Integration" },
        { id: "11", title: "Authentication" },
        { id: "12", title: "Form Validation" },
      ],
    },
    {
      id: "gohead",
      title: "Go Ahead",
      tasks: [
        { id: "13", title: "Create Components" },
        { id: "14", title: "Responsive Design" },
        { id: "15", title: "Error Handling" },
        { id: "16", title: "Testing Setup" },
        { id: "17", title: "Code Review" },
        { id: "18", title: "Performance Optimization" },
      ],
    },
    {
      id: "complete",
      title: "Complete",
      tasks: [
        { id: "19", title: "Project Setup" },
        { id: "20", title: "Folder Structure" },
        { id: "21", title: "Props & State" },
        { id: "22", title: "React Hooks" },
        { id: "23", title: "Deployment" },
        { id: "24", title: "Documentation" },
      ],
    },
    {
      id: "test",
      title: "Test",
      tasks: [
        { id: "25", title: "Unit Testing" },
        { id: "26", title: "Integration Testing" },
        { id: "27", title: "Bug Fixing" },
        { id: "28", title: "API Testing" },
        { id: "29", title: "UI Testing" },
        { id: "30", title: "Final Testing" },
      ],
    },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setColumns((previousColumns) => {
      const updatedColumns = previousColumns.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }));

      const sourceColumn = updatedColumns.find(
        (column) => column.id === source.droppableId,
      );

      const destinationColumn = updatedColumns.find(
        (column) => column.id === destination.droppableId,
      );

      if (!sourceColumn || !destinationColumn) {
        return previousColumns;
      }

      // Item ko source column se remove karo
      const [movedItem] = sourceColumn.tasks.splice(source.index, 1);

      if (!movedItem) return previousColumns;

      // Item ko destination column mein add karo
      destinationColumn.tasks.splice(destination.index, 0, movedItem);

      return updatedColumns;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableArea columns={columns} />
    </DragDropContext>
  );
};

// DroppableArea Component
const DroppableArea = ({ columns }) => {
  return (
    <div className="columns-container">
      {columns.map((column, index) => (
        <div className="column-wrapper" key={column.id}>
          <h2>{column.title}</h2>

          <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area"
                style={{
                  padding: "16px",
                  background: snapshot.isDraggingOver ? "#dbeafe" : "#f3f4f6",
                  minHeight: "200px",
                }}
              >
                <DraggableItems tasks={column.tasks} />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};

// DraggableItems Component
const DraggableItems = ({ tasks }) => {
  return tasks.map((item, index) => (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // className="drag-items2"
            className={`drag-items2 ${
              snapshot.isDragging ? "draggingOver" : ""
            }`}
            // style={{
            //   background: snapshot.isDragging ? "#bfdbfe" : "#fff",
            //   ...provided.draggableProps.style,
            // }}
          >
            {item.title}
          </div>
        );
      }}
    </Draggable>
  ));
};

export default ListDrag2;
