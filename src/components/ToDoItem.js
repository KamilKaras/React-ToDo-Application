import React from "react";

function ToDoItem (props) {
    return(
        <div key={props.task.id} className="one-task">
            <p className={`${props.task.isComplited ? "complete": ""}`}>{props.task.description}</p>
            <div>
                <button className="button-complete task-button" onClick={()=>props.isComplited(props.task)}>
                    <i className="fa fa-check-circle"></i>
                </button>
                <button className="button-delete task-button" onClick={()=>props.deleteItem(props.task)}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    )
} 

export default ToDoItem;