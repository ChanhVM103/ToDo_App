import React from "react";

function TodoItem(props) {
  function handleClick() {
    alert(props.name);
  }
  return (
    <>
      <div className="todo-item" onClick={handleClick}>
        <p className="todo-item-text">{props.name}</p>
        {props.isImportant &&<p>⭐</p>}
      </div>
    </>
  );
}

export default TodoItem;
