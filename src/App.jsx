import { useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import CategoryList from "./components/CategoryList";
import { AppContext } from "./components/Context/AppProvider";

function App() {
  // const todoList = [
  //   { id: 1, name: "Đi học thêm" },
  //   { id: 2, name: "Đi họ võ " },
  //   { id: 3, name: "Đi ngủ" },
  // ];
  const [todoList, setToDoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Đi họ võ ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Đi ngủ",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "travel",
    },
  ]);
  const {selectedCategoryId, setSelectedCategoryId} = useContext(AppContext)
  console.log(todoList);
  const [showSidebar, setShowSidebar] = useState(false);

  const [activateTodoItemId, setActivateTodoItemId] = useState();
  const activeTodoItem = todoList.find(
    (todo) => todo.id === activateTodoItemId
  ); //
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const hanndleCompletedCheckbox = (todoId) => {
    const newList = todoList.map((todos) => {
      if (todoId === todos.id) {
        return { ...todos, isCompleted: !todos.isCompleted };
      }
      return todos;
    });
    setToDoList(newList);
  };
   
  const [searchText, setSearchtext] = useState('');

  const handleShow = (todoId) => {
    setShowSidebar(true);
    setActivateTodoItemId(todoId);
  };
  const handleCompleteCheckboxChange = (newTodo) => {
    const newList = todoList.map((todos) => {
      if (newTodo.id === todos.id) {
        return newTodo;
      }
      return todos;
    });
    setToDoList(newList);
  };

  const inputRef = useRef();
  console.log(inputRef);

  const filterTodo = useMemo(() => {
    return todoList.filter((todo) => {
      if (searchText && !todo.name.includes(searchText)) {
  return false;
}
   const isCategoryMatched = !selectedCategoryId || todo.category === selectedCategoryId;
   if (!isCategoryMatched) {
      return false;
   }
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <FilterPanel
            selectedFilterId={selectedFilterId}
            setSelectedFilterId={setSelectedFilterId}
            todoList={todoList}
            searchText={searchText}
            setSearchText={setSearchtext}
          />
          <CategoryList
            todoList={todoList}
            selectedFilterId={selectedFilterId}
            searchText={searchText}
          />
        </div>
        <div className="main-content">
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
                      isDeleted: false,
                      category: "personal",
                    },
                  ]);
                  inputRef.current.value = "";
                }
              }}
            />
          </div>
          {filterTodo.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted} 
                handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                hanndleCompletedCheckbox={hanndleCompletedCheckbox}
                handleShow={handleShow}
              />
            );
          })}
          <div className="sidebar">
            {showSidebar && (
              <Sidebar
                key={activateTodoItemId}
                todoItem={activeTodoItem}
                handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                setShowSidebar={setShowSidebar}
              />
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
