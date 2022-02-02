import React from "react";
import AddUser from "./AddUser";

class Menu extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            newUserVisi:"off",
            visible:1,
            userToVisible:0
        }
    }

    render(){
        return(
            <div className="menu">
                <div>
                    <div className="image"></div>
                    <h1>To Do Aplication</h1>
                    <button className="button" onClick={this.ChangeVisibility.bind(this)}>Create new user</button>
                </div>
                <AddUser addUserVisible ={this.state.newUserVisi} newUserCreated={this.NewUserCreated.bind(this)} changeVisibility={this.ChangeVisibility.bind(this)}/>
                <div className="menu-list">
                    <button className="button-menu" onClick={() => this.props.showUsers(1)}>User List</button>
                    <button className="button-menu">Calendar</button>
                    <button className="button-menu">Tasks</button>
                </div>
            </div>
        )
    }
    ChangeVisibility(){
        if(this.state.visible === 1)
        {
            this.setState({
                newUserVisi:"new-user-on",
                visible:0
            })
        }
        else{
            this.setState({
                newUserVisi:"off",
                visible:1
            })
        }
    }
    NewUserCreated(newUser){
        this.props.parentCallback(newUser)
    }
}
export default Menu;