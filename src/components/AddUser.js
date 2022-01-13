import React from "react";

class AddUser extends React.Component{
    constructor(props){
        super(props)

        this.state={

        }
    }

    render (){
      console.log("siema add user")
        return(
            <div className="Add-user">
                <input
                  type="text"
                  placeholder='Add new user'
                  className="input"
                  value = {this.state.newValue}
                  onChange={this.inputUpdater.bind(this)}
                />
                <button className="button" onClick={this.addNewUser.bind(this)}>Add user</button>
            </div>
        )
    }
}
export default AddUser;