import React from "react";
import Menu from "./Menu";
import UserList from "./UserList";
import TaskList from "./TasksList";

class ToDoList extends React.Component {
    constructor(props){
    super(props)

    this.state ={
      userList:[],
      visible:true,
      userToVisible:0
    }
      
    }
    render(){
      return (
        <div className="container">
          <Menu userList = {this.state.userList} parentCallback={this.ChildCallbackAdd.bind(this)} showUsers = {this.ShowUsers.bind(this)}/>
          {this.state.visible ?
            <UserList userList = {this.state.userList} parentCallback={this.ChildCallbackList.bind(this)} parentCallbackWhoLogged = {this.WhoLogged.bind(this)}/>
            :
            this.state.userList.filter(user => user.id === this.state.userToVisible).map(user => {
              return(
                <TaskList key ={user.id} user={user} userList ={this.state.userList}/>
              )
            })}
        </div>
      );
    }
    ChildCallbackAdd(childData){
      const userList = [...this.state.userList]
      userList.push(childData)
      this.setState({
         userList, 
      })
    }
    ChildCallbackList(childData){
      const userList = childData;
      this.setState({
         userList, 
      })
    }
    WhoLogged(childData,showList){
      this.setState({
        userToVisible:childData,
        visible:showList
      })
    }
    ShowUsers(childData){
      this.setState({
        visible:childData
      })
    } 
}   
    

export default ToDoList;