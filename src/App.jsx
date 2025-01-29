import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Aprender React" },
  { id: 2, text: "Aprender JS" },
  { id: 3, text: "Aprender Vue.js" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const aux = { ...todos[startIndex] };
    todos[startIndex] = todos[endIndex];
    todos[endIndex] = aux;

    setTodos([...todos]);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1>Todo App</h1>
        <Droppable droppableId="todos">
          {(droppableProvider) => (
            <ul
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  index={index}
                  draggableId={`${todo.id}`}
                >
                  {(draggableProvider) => (
                    <li
                      ref={draggableProvider.innerRef}
                      {...draggableProvider.draggableProps}
                      {...draggableProvider.dragHandleProps}
                    >
                      {todo.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default App;
