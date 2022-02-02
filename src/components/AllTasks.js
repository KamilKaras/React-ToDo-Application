import React from "react";

function AllTasks (props) {
        {this.props.task.tasks.map(task => {
            return(
                <div key={props.task.id} className="one-task">
                    <p>{props.task.userName}</p>
                    <p>{task}</p>
                </div>
            )
        })}
} 

export default AllTasks;