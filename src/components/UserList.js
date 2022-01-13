import React from "react";
import NewUser from "./NewUser";

class UserList extends React.Component{
    constructor(props){
        super(props)

        this.state={
            userList:this.props.userList
        }
    }

    render(){
        return(
            <div className="user-list">
                <h1>User List</h1>
                {this.props.userList.map(user =>{
                    return(
                        <NewUser key={user.id}
                         user={user}
                         deleteUser = {this.deleteUser.bind(this)}
                         className="test"/>
                    )
                })}
            </div>
        )
    }
    deleteUser(userId){
        const refreshList = this.props.userList.filter(user => user.id !== userId)
        this.props.parentCallback(refreshList)
    }
}

export default UserList;