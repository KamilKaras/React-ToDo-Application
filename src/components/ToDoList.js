import React from "react";
import Menu from "./Menu";
import UserList from "./UserList";


class ToDoList extends React.Component {
    constructor(props){
    super(props)

    this.state ={
      userList:[]
    }
      
    }
    render(){
      return (
        <div className="container">
          <Menu userList = {this.state.userList} parentCallback={this.childCallback.bind(this)}/>
          <UserList userList = {this.state.userList} parentCallback={this.childCallback.bind(this)}/>
        </div>
      );
    }
    childCallback(childData){
      this.setState({
        userList:childData
      })
    } 
}   
    

export default ToDoList;