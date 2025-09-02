import React, { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
function Sidebar(props) {
  
  const data = props.todoItem;
  const [name, setName]= useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant)
  const[isCompleted, setIsCompleted] = useState(data.isCompleted)
  const handleSave= ()=>{
    const newTodo = {...data, name, isImportant, isCompleted}
     props.handleCompleteCheckboxChange(newTodo);
     props.setShowSidebar(false)
  }
  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            value={name}
            
            onChange={(e) => {
              // props.handleCompleteCheckboxChange(data.id, e.target.value);
             setName(e.target.value)
              
            }}
          />
        </div>

        <div className="sb-form-field">
          <label htmlFor="sb-important">Is Important</label>
          <input
            id="sb-important"
            name="name"
            type="checkbox"
            checked={isImportant}
            onChange={()=> setIsImportant(!isImportant)}
          />
        </div>

        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is Completed</label>
          <input
            id="sb-completed"
            name="name"
            type="checkbox"
            checked={isCompleted}
             onChange={()=> setIsCompleted(!isCompleted)}
          />
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={()=> props.setShowSidebar()}>Cancel</button>
      </div>
    </div>
  );
}
  Sidebar.protoTypes={
    setShowSidebar : PropTypes.func,
    todoItem: PropTypes.shape({
      name: PropTypes.string,
      isImportant: PropTypes.bool,
      isCompleted:PropTypes.bool,
    }),
    handleCompleteCheckboxChange: PropTypes.func
  }
export default Sidebar;
