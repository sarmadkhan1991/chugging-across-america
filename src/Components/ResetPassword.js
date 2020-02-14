import React, { Component } from "react";
import axios from "axios";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            msg: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }
    changeHandler(key, value) {
        this.setState( {
            [key]: value
        });
    }
    cancel() {
        this.setState( {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }
    async updatePassword() {
        const { oldPassword, newPassword, confirmPassword } = this.state;
        let pwdVerified = false;
        
        if(newPassword === "" || confirmPassword === "") {
            alert("All fields are required.")
            return
        } else if(newPassword !== confirmPassword) {
            alert("ERROR: New Password and Confirm Password must match. Please try again.")
            return
        } 
        await axios.put("/api/auth/verifyPassword", {oldPassword})
        .then(() => {
            pwdVerified = true;
        })
        .catch(() => {
            pwdVerified = false;
        })
        if(pwdVerified !== true) {
            alert("Old password not correct.")
            return
        }
        axios.put("/api/auth/updatePassword", {confirmPassword})
        .then(() => {
            this.setState( {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                msg: "Your password was reset."
            })
        })
    }
    render() {
        const { msg } = this.state;
        return (
            <div>
                <div className="reset-password-container">
                    <h1>
                        Reset Password
                    </h1>
                    <br /><br />
                    <div>
                        <span className="success-msg">
                            {msg}
                        </span>
                    </div>
                    <div>
                        <label>Old Password:</label>
                    </div>
                    <div>
                        <input type="password" name="oldPassword" onChange={event => this.changeHandler(event.target.name, event.target.value)} value={this.state.oldPassword} />
                    </div>
                    <div>
                        <label>New Password:</label>
                    </div>
                    <div>
                        <input type="password" name="newPassword" onChange={event => this.changeHandler(event.target.name, event.target.value)} value={this.state.newPassword} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                    </div>
                    <div>
                        <input type="password" name="confirmPassword" onChange={event => this.changeHandler(event.target.name, event.target.value)} value={this.state.confirmPassword} />
                    </div>
                    <div className="reset-password-button-container">
                        <button className="authButton" onClick={this.cancel}>
                            Cancel
                        </button>
                        <button className="authButton" onClick={this.updatePassword}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}