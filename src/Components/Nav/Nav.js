import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            menuStatus: "hamburger-menu"
        };
    }
    toggleMenu = () => {
        if(this.state.menuStatus === "hamburger-menu" || this.state.menuStatus === "hamburger-menu-close") {
            this.setState( {
                menuStatus: "hamburger-menu-open"
            })
        } else {
            this.setState( {
                menuStatus: "hamburger-menu-close"
            })
        }
    }
    render() {
        return (
            <div>
                <GiHamburgerMenu className="hamburger-icon" size={36} onClick={this.toggleMenu} />
                <menu className={this.state.menuStatus}>
                    <div className="link-container">
                        <div>
                            <Link to="/" className="react-link">
                                Create A Trip
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/trips" className="react-link">
                                Saved Trips
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/profile" className="react-link">
                                Reset Password
                            </Link>
                        </div>
                        <div>
                            <span className="react-link" onClick={this.props.logoutFn}>Logout</span>
                        </div>
                    </div>
                </menu>
            </div>
        );
    }
}
export default Nav;