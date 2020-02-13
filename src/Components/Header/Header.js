import React, { Component } from "react";
import axios from "axios";

import Nav from "../Nav/Nav"

class Header extends Component {
    constructor() {
    super();
    this.state = {
        user: {},
        username: "",
        password: ""
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios
        .get('/api/auth/userSession')
        .then(res => {
            console.log(res.data)
            this.setState( {
                user: res.data
            })
        })
    }
    handleUsernameInput(value) {
        this.setState( { 
            username: value
        });
    }
    handlePasswordInput(value) {
        this.setState( {
            password: value
        });
    }
    updateUser(user) {
        this.setState( {
            user
        });
    }
    register() {
        const { username, password } = this.state;
        axios
        .post('/api/auth/register', {username, password})
        .then(user => {
            this.setState( {
            username: '',
            password: ''
            });
            this.updateUser(user.data);
        })
        .catch(err => {
            this.setState( {
            username: '',
            password: ''
            });
            alert(err.response.request.response)
        });
    }
    login() {
    const { username, password } = this.state;
    axios
    .post("/api/auth/login", {username, password})
    .then(user => {
        this.updateUser(user.data);
    }) 
    .catch(err => alert(err.response.request.response));
    }
    logout() {
    axios
    .post("/api/auth/logout")
    .then(() => {
        this.updateUser({});
    })
    .catch(err => console.log(err));
    }

    render() {
    const { user, username, password } = this.state;
        return (
            <div>
                <header>
                   <h1>
                        Chugging Across America
                    </h1>
                    {user.username ?
                        (
                            <div>
                                Cheers, {user.username} 
                                {/* <button onClick={this.logout}>
                                    Logout
                                </button> */}
                                <Nav logoutFn={this.logout} />
                            </div>
                        ):
                        (
                            <div className="login-container">
                                <div>
                                    <input className="username-input" type="text" placeholder="Enter username" value={username} onChange={e => this.handleUsernameInput(e.target.value)}></input>
                                </div>
                                <div>
                                    <input className="password-input"  type="password" placeholder="Enter password" value={password} onChange={e => this.handlePasswordInput(e.target.value)}></input>
                                </div>
                                <div>
                                    <button className="login-button" onClick={this.login}>
                                        Login
                                    </button>
                                    <button onClick={this.register}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </header>
            </div>
        );
    }
}
export default Header;