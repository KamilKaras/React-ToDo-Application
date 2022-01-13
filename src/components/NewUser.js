import React from "react";

function NewUser (props) {
    return(
        <div key={props.user.id} className="one-user">
            <div className="user">
                <div className="avatar"></div>
                <div className="user-data">
                    <p className="user-title">Name</p>
                    <p className="user-value">{props.user.name}</p>
                </div>
            </div>
            <div className="account">
                <div className="user">
                    <div className="user-data">
                        <p className="user-title">Account created</p>
                        <p className="user-value">{props.user.created}</p>
                    </div>
                </div>
                <div className="user">
                    <div className="user-data">
                        <p className="user-title">Tasks to do</p>
                        <p className="user-value">{props.user.tasks.length}</p>
                    </div>
                </div>
                <div className="user">
                    <div className="user-data">
                        <p className="user-title">Last task modify</p>
                        <p className="user-value">{props.user.modify}</p>
                    </div>
                </div>
                <div className="user">
                    <div className="user-data">
                        <p className="user-title">Status</p>
                        <p className="user-value-status">{props.user.status}</p>
                    </div>
                </div>
            </div>
            <button className="button-delete-user" onClick={()=>props.deleteUser(props.user.id)}>Delete</button>
        </div>
    )
} 

export default NewUser;