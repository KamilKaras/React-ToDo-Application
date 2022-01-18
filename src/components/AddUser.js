import React from "react";

class AddUser extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            newName:"",
            email:"",
            newPassword:"",
            passwordRepeat:""
        }
    }

    render (){
        return(
        <div className={this.props.addUserVisible}>
            <input
            type="text"
            placeholder='Enter name'
            className="input"
            value={this.state.newName}
            onChange={event=>this.InputUpdate("newName",event.target.value)}
            />
            <input
            type="email"
            name="email"
            placeholder='Email'
            className="input"
            value={this.state.email}
            onChange={event=>this.InputUpdate("email",event.target.value)}
            />
            <input
            type="password"
            placeholder='Enter password'
            className="input"
            value={this.state.newPassword}
            onChange={event=>this.InputUpdate("newPassword",event.target.value)}
            />
            <input
            type="password"
            placeholder='Repeat password'
            className="input"
            value={this.state.passwordRepeat}
            onChange={event=>this.InputUpdate("passwordRepeat",event.target.value)}
            />
            <button className="button" onClick={this.AddUser.bind(this)}>Accept</button>
        </div>
        )
    }
    InputUpdate(key,value){
        this.setState({
            [key]:value
        })
    }
    AddUser(){
        if(this.state.newName === "" || this.state.email === ""){
            alert("Please enter the name and email!")
        }
        else if(!this.state.email.includes("@")){
            alert("Adress email needs to have '@'")
        }
        else{
            const isCorrect = this.PasswordCheck(this.state.newPassword, this.state.passwordRepeat)
            if(isCorrect){
                const newUser = this.createUser();
                this.props.newUserCreated(newUser);
                this.props.changeVisibility("new-user-on");

                this.setState({
                    newName:"",
                    email:"",
                    newPassword:"",
                    passwordRepeat:"",
                    isCorrect: false
                });
            }
        }
    }
    PasswordCheck(password,passwordRepeat){
        if(password === "" || password.length <= 7){
            alert("Please enter password which has more then 8!")
        }
        else if(password !== passwordRepeat){
            alert("Passwords don't match!!!")
        }
        else{
            if(password.charAt(0) !== password.charAt(0).toUpperCase()){
                alert("First letter needs to be capital")
            }
            else{
                return true;
            }
        }
    }
    createUser(){
        const newUser={
            id: Math.random()+1,
            name:this.state.newName,
            password:this.state.newPassword,
            email:this.state.email.toLocaleLowerCase(),
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