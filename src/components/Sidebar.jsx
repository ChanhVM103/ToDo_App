import React from 'react'
import './Sidebar.css';
function Sidebar(props) {
    const data= props.todoItem;
  return (
    <div className='sidebar'>
        <form className='sb-form'>
          <div className='sb-form-field'>
         <label htmlFor='sb-name'>Todo Name</label>
          <input id="sb-name" name="name" type='text'/>
          </div>

            <div className='sb-form-field'>
         <label htmlFor='sb-important'>Is Important</label>
          <input id="sb-important" name="name" type='checkbox'/>
          </div>

            <div className='sb-form-field'>
         <label htmlFor='sb-completed'>Is Completed</label>
          <input id="sb-completed" name="name" type='checkbox'/>
          </div>
        </form>
        <div className='sb-footer'>
          <button>Save</button>
          <button>Cancel</button>
        </div>
    </div>
  )
}
 
export default Sidebar