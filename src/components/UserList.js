import React from "react";
import NewUser from "./NewUser";

class UserList extends React.Component{

    render(){
        return(
            <div className="user-list">
                <h1>User List</h1>
                {this.props.userList.map(user =>{
                    return(
                        <NewUser key={user.id}
                         user={user}
                         deleteUser = {this.DeleteUser.bind(this)}
                         whoIsLogged = {this.WhoIsLogged.bind(this)}
                         />
                    )
                })}
            </div>
        )
    }
    DeleteUser(userId){
        const refreshList = this.props.userList.filter(user => user.id !== userId)
        this.props.parentCallback(refreshList)
    }
    WhoIsLogged(logged){
        const showList = false;
        this.props.parentCallbackWhoLogged(logged,showList)
    }
}

export default UserList;