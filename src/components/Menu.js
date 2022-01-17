import React from "react";

class Menu extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            newUserVisi:"off",
            visible:1,
            newName:"",
            newPassword:"",
            passwordRepeat:"",
            email:"",
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
                <div className={this.state.newUserVisi}>
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
                <div className="menu-list">
                    <button className="button-menu" onClick={() => this.props.showUsers(true)}>User List</button>
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
                this.props.parentCallback(newUser);
                this.ChangeVisibility("new-user-on");

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
export default Menu;