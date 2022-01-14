import React from "react";

function ToDoItem (props) {
    return(
        <div key={props.task.id} className="one-task">
            {props.task.desc}
            <button className="button" onClick={()=>props.deleteItem(props.task.id)}>Delete</button>
        </div>
    )
} 

export default ToDoItem;