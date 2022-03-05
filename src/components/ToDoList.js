import React from "react";
import Menu from "./Menu";
import UserList from "./UserList";
import TaskList from "./TasksList";
import Popup from "./Popup";
import configData from "./config.json";

class ToDoList extends React.Component {
    constructor(props){
    super(props)
    this.state ={
      userList:[],
      visibleList:true,
      userToLogin:"",
      popupVisible: false,
      loggedUserId:0,
      tasks: []
    }
      
    }
    render(){
      return (
        <div className="container">
          <Popup trigger={this.state.popupVisible} closePopup = {this.ClosePopup.bind(this)} userList = {this.state.userList}
          userToLogin ={this.state.userToLogin} whoIsLogged = {this.WhoIsLogged.bind(this)} userLogin = {this.UserLogin.bind(this)} />
          <Menu userList = {this.state.userList} parentCallback={this.ChildCallbackAdd.bind(this)} showUsers = {this.ShowUsers.bind(this)}/>
          {this.state.visibleList ?
            <UserList userList = {this.state.userList} DeleteUser={this.DeleteUser.bind(this)} UserToLogin = {this.UserToLogin.bind(this)}
            showPopup ={this.ShowPopup.bind(this)}/>
            :
            this.state.userList.filter(user => user.id === this.state.loggedUserId).map(user => {
              return(
                <TaskList key ={user.id} user={user} userList ={this.state.userList} tasks={this.state.tasks} getUserTasks ={this.GetUserTasks.bind(this)}/>
              )
            })}
        </div>
      );
    }
    ChildCallbackAdd(user){
      this.UserRegistration(user.email, user.password, user.name)
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

    UserRegistration(email, password, login) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
                email: email,
                password: password,
                login:login
             })
      };
      fetch(`${configData.SERVER_URL}Auth/Register`, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
            
              if (!response.ok) {
                  const error = data
                  return Promise.reject(error);
              }
              this.GetAllUsers()
          })
          .catch(error => {
              alert(error.errors);
          });
         
    }

    GetAllUsers(){
      fetch(`${configData.SERVER_URL}Users/GetAllUsers?page=1&count=10`)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            this.setState({ 
                userList:data
            })
      })
      .catch(error => {
            alert("Server doesn't respond",error);
      });
    }

    DeleteUser(userToDelete){
      fetch(`${configData.SERVER_URL}Users/${userToDelete.map(user => user.id)}`,{
          method:"DELETE"
      })
          .then(async response => {
              const data = await response.json();

          if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            
         }
            this.GetAllUsers()
    })
          .catch(error => {
              alert("Server doesn't respond", error);
          });
    }

    componentDidMount() {
        this.GetAllUsers()
        this.GetUserTasks()
    }

    UserLogin(email, password){
        const requestOptions ={
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              email:email,
              password:password
          })
        };
        
        fetch(`${configData.SERVER_URL}Auth/Login`, requestOptions)
          .then(async response => {
              const data =  await response.json();

              if(!response.ok)
              {
                  const errorMessage = data
                  return Promise.reject(errorMessage);
              }
              this.setState({
                visibleList:false,
              })
              console.log(data)
          })

          .catch(errorMessage => {
            alert(errorMessage.errors)
        })
    }
    
    GetUserTasks(){
        fetch(`${configData.SERVER_URL}ToDo?page=1&count=10`)
          .then(async response => {
            const data = await response.json();

            if(!response.ok){
              const errorMessage = data;
              return Promise.reject(errorMessage);
            }
            this.setState({
              tasks:data
            })
            console.log(data)
          })

          .catch(errorMessage => {
            alert(errorMessage.errors)
          })
    }
}   
    

export default ToDoList;