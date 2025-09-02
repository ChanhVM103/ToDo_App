

function TodoItem(props) {
  return (
    <>
      <div className="todo-item"
        onClick={()=>{
          props.handleShow(props.id)
        }}
      >

        <div style={{ display: "flex", gap: 4 }}>
          <input
            type={"checkbox"}
            checked={props.isCompleted}
            onClick={(e)=>{
              e.stopPropagation();
            }}
            onChange={()=>{
               props.hanndleCompletedCheckbox(props.id)
            }}
          />
          <p className="todo-item-text">{props.name}</p>
        </div>
        {props.isImportant && <p>⭐</p>}
      </div>
    </>
  );
}

export default TodoItem;
