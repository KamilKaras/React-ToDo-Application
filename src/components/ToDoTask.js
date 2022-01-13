import React from "react";

function ToDoItem (props) {
    return(
        <div key={props.element.id} className="one-task">
            {props.element.tasks.map(taks =>{
                return(
                    <div>
                        {this.task}
                        <button className="button" onClick={()=>props.deleteItem(props.element.id)}>Delete</button>
                    </div> 
                )})};
        </div>
    )
} 

export default ToDoItem;