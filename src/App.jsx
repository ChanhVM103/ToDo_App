import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";

function App() {
  // const todoList = [
  //   { id: 1, name: "Đi học thêm" },
  //   { id: 2, name: "Đi họ võ " },
  //   { id: 3, name: "Đi ngủ" },
  // ];
  const [todoList, setToDoList] = useState([
    { id: 1, name: "Đi học thêm", isImportant: true, isCompleted: true },
    { id: 2, name: "Đi họ võ ", isImportant: true, isCompleted: false },
    { id: 3, name: "Đi ngủ", isImportant: false, isCompleted: true },
  ]);
  console.log(todoList);
  const[showSidebar, setShowSidebar]= useState(false)
   
  const[activateTodoItemId, setActivateTodoItemId]= useState()
  const activeTodoItem= todoList.find(todo=> todo.id === activateTodoItemId)  
  
  const hanndleCompletedCheckbox = (todoID) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == todoID) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setToDoList(newTodoList);
  };
 
    const handleShow=(todoId)=>{
       setShowSidebar(true)
       setActivateTodoItemId(todoId)
    }
   
  const inputRef = useRef();
  console.log(inputRef);

  const todo = todoList.map((todos) => (
    <TodoItem
      key={todos.id}
      id={todos.id}
      name={todos.name}
      isImportant={todos.isImportant}
      isCompleted={todos.isCompleted}
      hanndleCompletedCheckbox={hanndleCompletedCheckbox}
      handleShow={handleShow}
    />
  ));

  return (
    <>
      <div className="container">
        <div>
          <input
            ref={inputRef}
            type="text"
            name="add-new-task"
            placeholder="Add new task"
            className="task-input"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                const value = e.target.value;
                console.log(value);
                setToDoList([
                  ...todoList,
                  {
                    id: crypto.randomUUID(),
                    name: value,
                    isCompleted: false,
                    isImportant: false,
                  },
                ]);
                inputRef.current.value = "";
              }
            }}
          />
        </div>
        <div>{todo}</div>
         <div className="sidebar">
         {showSidebar && <Sidebar todoItem={ activeTodoItem}/>}
         </div>
      </div>
    </>
  );
}

export default App;
