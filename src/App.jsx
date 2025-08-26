import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  // const todoList = [
  //   { id: 1, name: "Đi học thêm" },
  //   { id: 2, name: "Đi họ võ " },
  //   { id: 3, name: "Đi ngủ" },
  // ];
   const [todoList, setToDoList]= useState([
    { id: 1, name: "Đi học thêm", isImportant: true },
    { id: 2, name: "Đi họ võ ", isImportant: true },
    { id: 3, name: "Đi ngủ", isImportant:false }
   ])

   const inputRef= useRef();
   console.log(inputRef);
   
  const todo = todoList.map((todos) => (
    <TodoItem key={todos.id} name={todos.name} isImportant={todos.isImportant} />
  ));
  return (
    <>
      <div className="container">
        <div>
          <input
          ref={(inputRef)}
            type="text"
            name="add-new-task"
            placeholder="Add new task"
            className="task-input"
            onKeyDown={(e)=>{
              if(e.key =='Enter'){
                const value= e.target.value;
                console.log(value);
               setToDoList([...todoList, {id :crypto.randomUUID(), name: value} ])
               inputRef.current.value= '';
              }
             
              
            }}
          />
        </div>
        <div>{todo}</div>
      </div>
    </>
  );
}

export default App;
