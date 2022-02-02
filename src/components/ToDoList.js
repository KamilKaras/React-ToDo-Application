import React from "react";
import Menu from "./Menu";
import UserList from "./UserList";
import TaskList from "./TasksList";
import Popup from "./Popup";

class ToDoList extends React.Component {
    constructor(props){
    super(props)
    this.state ={
      userList:[],
      visibleList:true,
      userToLogin:"",
      popupVisible: false,
      loggedUserId:0,
    }
      
    }
    render(){
      return (
        <div className="container">
          <Popup trigger={this.state.popupVisible} closePopup = {this.ClosePopup.bind(this)} userList = {this.state.userList}
          userToLogin ={this.state.userToLogin} whoIsLogged = {this.WhoIsLogged.bind(this)}/>
          <Menu userList = {this.state.userList} parentCallback={this.ChildCallbackAdd.bind(this)} showUsers = {this.ShowUsers.bind(this)}/>
          {this.state.visibleList ?
            <UserList userList = {this.state.userList} parentCallback={this.ChildCallbackList.bind(this)} UserToLogin = {this.UserToLogin.bind(this)}
            showPopup ={this.ShowPopup.bind(this)}/>
            :
            this.state.userList.filter(user => user.id === this.state.loggedUserId).map(user => {
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
    UserToLogin(childData){
      this.ShowPopup()
      this.setState({
        userToLogin:childData,
      })
    }
    WhoIsLogged(childData){
      this.setState({
        loggedUserId:childData,
        visibleList:false,
        popupVisible:false
      })
    } 
    ShowUsers(childData){
      this.setState({
        visibleList:childData
      })
    }
    ShowPopup(){
      this.setState({
        popupVisible:true
      })
    }
    ClosePopup(){
      this.setState({
        popupVisible:false
      })
    } 
    apiUserLogin(email, password) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
                email: email,
                password: password
             })
      };
      fetch('https://localhost:44366/Auth/Login', requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
                console.log(data)
            
              if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }

          })
          .catch(error => {
              this.setState({ errorMessage: error.toString() });
              alert('There was an error!', error);
          });
    }
}   
    

export default ToDoList;