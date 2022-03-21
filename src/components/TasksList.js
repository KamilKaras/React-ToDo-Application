import React from "react";
import ToDoItem from "./ToDoItem";
import configData from "./config.json";

class ToDoList extends React.Component {
    constructor(props){
    super(props)
  
      this.state={
        newTask:""
      }
    }
    render(){
      return (
          <div className="to-do-list">
            <h1>{this.props.user.name} Tasks</h1>
              <div className="new-task">
                <input
                  type="text"
                  placeholder='Add new task'
                  className="input-task"
                  value = {this.state.newTask}
                  onChange={event => this.InputUpdate("newTask",event.target.value)}
                />
                <button className="button" onClick={this.AddNewTask.bind(this)}>Add task</button>
              </div>
              <div className="tasks">
                {this.props.tasks.map(task => {
                  return(
                    <ToDoItem task = {task} key={task.id} deleteItem={this.DeleteItem.bind(this)} isComplited={this.IsComplited.bind(this)}/>
                  )
                })}
              </div>
          </div>
      );
    }

    InputUpdate(key,value){
      this.setState({
        [key]: value
      })
    }
    
    AddNewTask(){
      if(this.state.newTask === ""){
        alert("Write something in input field");
      }
      else{
        const requestOptions ={
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              title:"Tytuł",
              description:this.state.newTask,
              userId: this.props.user.id
          })
        }
        fetch(`${configData.SERVER_URL}ToDo`, requestOptions)
          .then(async response => {
            const data = await response.json();
            
            if(!response.ok){
              const errorMessage = data;
              return Promise.reject(errorMessage)
            }
            this.props.getUserTasks(this.props.user.id)            
          })
        .catch(errorMessage => {
            alert(errorMessage)
        })
        this.setState({
          newTask: ""
        })
      }
    }

    DeleteItem(task){
        fetch(`${configData.SERVER_URL}ToDo/${task.id}`,{
            method:"DELETE"
        })
            .then(async response => {
                const data = await response.json();
  
                if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
                }
                this.props.getUserTasks(this.props.user.id)     
      })
            .catch(error => {
                alert("Server doesn't respond", error);
            });
      }

    IsComplited(task){

      const requestOptions ={
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: `${task.id}`,
            title: "Tytuł",
            description: task.description,
            isComplited: true
        })
      };

      fetch(`${configData.SERVER_URL}ToDo/${task.id}`, requestOptions)
        this.props.getUserTasks()
    }
}

export default ToDoList;