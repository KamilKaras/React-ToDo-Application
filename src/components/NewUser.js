import React from "react";

class NewUser extends React.Component {

    render(){
        return(
            <div key={this.props.user.id} className="one-user">
                <div className="user-open" onClick={() =>this.props.userToLogin(this.props.user.id)}>
                    <div className="avatar"></div>
                    <div className="user-data">
                        <p className="user-title">Name</p>
                        <p className="user-value">{this.props.user.userName}</p>
                    </div>
                </div>
                <div className="account">
                    <div className="user">
                        <div className="user-data">
                            <p className="user-title">Account created</p>
                            <p className="user-value">{this.props.user.created}</p>
                        </div>
                    </div>
                    <div className="user">
                        <div className="user-data">
                            <p className="user-title">Tasks to do</p>
                            <p className="user-value">{this.props.user.tasks.length}</p>
                        </div>
                    </div>
                    <div className="user">
                        <div className="user-data">
                            <p className="user-title">Last task modify</p>
                            <p className="user-value">{this.props.user.modified}</p>
                        </div>
                    </div>
                    <div className="user">
                        <div className="user-data">
                            <p className="user-title">Status</p>
                            <p className="user-value-status">Online</p>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button-user" onClick={()=>this.props.deleteUser(this.props.user.id)}>Delete</button>
                </div>                    
            </div>
        )
    }
} 

export default NewUser;