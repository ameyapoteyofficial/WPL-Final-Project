import React, {Component, Fragment, useEffect, useState} from "react";
import axios from "axios";
import Formcontent from "./formcontent"
import { withRouter } from "react-router-dom";
import { Login } from "./paths";
import Footer from "./footer-file";
import { getUserToken } from "./userTokens";

class RegisterPage extends Component {
    constructor(props){
        super(props);
        if (getUserToken() != null){
            props.history.push("/");
        }

        this.onSubmitForm = this.onSubmitForm.bind(this);

        this.state = {
            name: "",
            emailId: "",
            password: "",
            confirmPassword: "",
        };
      }
        setName(e) {
            this.setState({ name: e.target.value });
        }

        setEmailId(e) {
            this.setState({ emailId: e.target.value });
        }

        setPassword(e) {
            this.setState({ password: e.target.value });
        }

        setConfirmPassword(e) {
            this.setState({ confirmPassword: e.target.value });
        }

        onSubmitForm(e) {
            e.preventDefault(); 

            if(this.state.name === "" || this.state.emailId === "" || this.state.password === "" || this.state.confirmPassword === ""){
                alert("Please enter all fields");
                this.setState({
                    name : "",
                    emailId : "",
                    password : "",
                    confirmPassword : "",
                });
                return;
            }

            if(this.state.password !== this.state.confirmPassword){
                alert("Passwords dont match");
                this.setState({
                    name : "",
                    emailId : "",
                    password : "",
                    confirmPassword : "",
                });
                return;
            }

            const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;
            const passwordPattern = /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*+]).{6,}/;

            if (!emailPattern.test(this.state.emailId)) {
                alert("Please enter a valid Email id ");
                this.setState({
                    name : "",
                    emailId : "",
                    password : "",
                    confirmPassword : "",
                });
                return;
              }

              if (!passwordPattern.test(this.state.password)) {
                alert("The password field should contain at least six characters, one uppercase letter, one number and one special character");
                this.setState({
                    name : "",
                    emailId : "",
                    password : "",
                    confirmPassword : "",
                });
                return;
              }

            const registerObject = {
                Name: this.state.name,
                Email: this.state.emailId,
                Password: this.state.password
              };

            axios.post("http://localhost:5000/api/users/register", registerObject).then((res) => {
                if (res.status === 200) {
                    this.setState({
                      name : "",
                      emailId : "",
                      password : "",
                      confirmPassword : "",
                    });                  
                  } else {
                    alert("error"+ res.json);
                    return;
                  }
                this.props.history.push("/");
            });
        }

    render(){
        return (
            <div className="container mt-5"> 
            <h1> Register </h1>
            <form className = "mt-5" onSubmit= {this.onSubmitForm}>
                    <Formcontent 
                        id = "name"
                        type = "text" 
                        label = "Name"
                        value = {this.state.name}
                        placeholder = "Enter Name"
                        onChange = {this.setName.bind(this)}
                        />
                    <Formcontent 
                        id = "email" 
                        type = "text" 
                        label = "Email"
                        value = {this.state.emailId}
                        placeholder = "Enter Email"
                        onChange = {this.setEmailId.bind(this)}
                        />
                    <Formcontent 
                        id = "password"
                        type = "password" 
                        label = "Password"
                        value = {this.state.password}
                        placeholder = "Enter Password"
                        onChange = {this.setPassword.bind(this)}
                        />
                    <Formcontent 
                        id = "confirmpassword"
                        type = "password" 
                        label = "Confirm Password"
                        value = {this.state.confirmPassword}
                        placeholder = "Re enter the Password"
                        onChange = {this.setConfirmPassword.bind(this)}
                        />
                <button type="submit" className="btn btn-primary mt-3">Register</button>
        </form>
        <Footer url={Login} text="New User?" name="Login"/>
        </div>
        );
    }

}

export default withRouter(RegisterPage);