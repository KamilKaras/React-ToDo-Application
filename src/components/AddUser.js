import React from "react";
import Forms from "./Forms"

class AddUser extends React.Component{
    

    render (){
        return(
        <div className={this.props.addUserVisible}>
            <Forms addUser = {this.AddUser.bind(this)}/>
        </div>
        )
    }
    AddUser(newUserForm){
        const newUser = this.createUser(newUserForm);
        this.props.newUserCreated(newUser);
        this.props.changeVisibility("new-user-on");
    }
    
    createUser(newUserForm){
        const newUser={
            id: Math.random()+1,
            name:newUserForm.firstName,
            password:newUserForm.password,
            email:newUserForm.email.toLocaleLowerCase(),
            tasks:[],
            created:this.GetData(),
            modify:this.GetData(),
            status:"offline"
            }
        return newUser;
    }
    GetData(){
        const newData = new Date();
        const actualYear = newData.getFullYear()
        const actualMonth = (newData.getMonth()+1).toString().padStart(2,"0")
        const actualDay = newData.getDate()
        return actualYear+"-"+actualMonth+"-"+actualDay;
    }
}
export default AddUser;