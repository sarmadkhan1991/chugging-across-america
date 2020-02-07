import React, { Component } from 'react';

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
                        <button>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}