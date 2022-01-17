import React from "react";
import ToDoItem from "./ToDoItem"

class ToDoList extends React.Component {
    constructor(props){
    super(props)
  
      this.state={
        newTask:"",
        tasks:this.props.user.tasks,
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
                {this.state.tasks.map(task =>{
                  return(
                    <ToDoItem task = {task} key={task.id} deleteItem={this.DeleteItem.bind(this)}/>
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
        const newTask = {
          id: 1 + Math.random(),
          desc: this.state.newTask
        };
        this.props.user.tasks.push(newTask);
        this.Modify();
        this.setState({
          newTask: ""
        })
      }
    }
    DeleteItem(itemId){
      const list = [...this.props.user.tasks];
      const filtredTasksList = list.filter(task => task.id !== itemId);
      this.setState({
        tasks:filtredTasksList
      })
      this.props.user.tasks = filtredTasksList;
      this.Modify();
    }
    Modify(){
      const newData = new Date();
      const actualMonth = (newData.getMonth()+1).toString().padStart(2,"0")
      const actualDay = newData.getDate()
      const actualHour = newData.getHours()
      const actualMin = (newData.getMinutes()).toString().padStart(2,"0")
      this.props.user.modify = actualDay+"."+actualMonth+ ", " + actualHour+":"+actualMin;
  }
}

export default ToDoList;