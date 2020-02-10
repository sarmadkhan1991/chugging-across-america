import React, { Component } from 'react';
import axios from 'axios';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""    
        }
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler(key, value) {
        this.setState({
            [key]: value
        });
    }
    updatePassword() {
        const { newPassword, confirmPassword } = this.state;
        if(newPassword == '') {
            alert("Please enter a new password.")
        } else if(confirmPassword == '') {
            alert("Please confirm password.")
        } else if(newPassword != confirmPassword) {
            alert("ERROR: New Password and Confirm Password must match. Please try again.")
        } else {
            axios.put('/api/auth/updatePassword', {confirmPassword})
            .then(() => {
                this.setState( {
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                this.props.history.push('/')
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <h1>
                        Reset Password
                    </h1>
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
                    <div>
                        <button>
                            Cancel
                        </button>
                        <button onClick={this.updatePassword}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}