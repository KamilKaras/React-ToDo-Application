import React from "react";
import ToDoTask from "./ToDoTask";

class ToDoList extends React.Component {
    constructor(props){
    super(props)
  
      this.state={
        
      }
    }
    render(){
      return (
          <div className="to-do-list">
            <h1>My ToDoList</h1>
              <div className="new-task">
                <input
                  type="text"
                  placeholder='Add new task'
                  className="input"
                  value = {this.state.newTask}
                  onChange={this.inputUpdate.bind(this)}
                />
                <button className="button" onClick={this.addNewTask.bind(this)}>Add task</button>
              </div>
              <div className="tasks">
                {this.state.userList.map(user =>{
                  return(
                    <ToDoTask element = {user}/> 
                  )
                })}
              </div>
              <button className="delete-all-button" onClick={this.deleteAll.bind(this)}>Delete all</button>
          </div>
      );
    }

    inputUpdate(event){
      const newValue = event.target.value
      this.setState({
        newTask: newValue
      })
    }

    addNewTask(){
      if(this.state.newTask === ""){
        alert("Write something in input field")
      }
      else{
        //this.userToAddTask = this.userList.filter(user => user.name = 'Kamil')
        const userToAdd = this.state.userList.filter(user => user.name === 'Kamil');
        const newTask = {
          id: 1 + Math.random(),
          task: this.state.newTask
        };
        userToAdd.map(user => user.tasks.push(newTask));
        console.log(this.state.userList);
        this.setState({
          newTask: ""
        })
      }
    }
    
    deleteAll(){
      if(this.state.userList.length<=0){
        alert("You don't have any tasks")
      }
      else{
        this.setState({
          userList: []
        })
      }
    }
}

export default ToDoList;