import React from 'react';
import classes from './Login.module.css';
import { emailRegex, formValid } from '../../Utils/Utilities/Utilities';
import { connect } from 'react-redux';
import Axios from 'axios'
import * as actionCreators from '../../Redux/Actions/Actions'

class Login extends React.Component {

    state = {
        accountUser: [],
        phone: "",
        formErrors: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }
    onUserLogin = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            var loginUser = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            this.props.loadUser(loginUser)
            this.registerdUser(loginUser)
        } else {
            alert("Please create account")
        }

    }
    registerdUser = (user) => {
        return new Promise((resolve, reject) => {
            Axios.get("http://localhost:4000/user?mail=" + user.email)
                .then(data => {
                    if (data.data.length === 0) {
                        alert("Youre Profile is not registerd please create account")
                    } else {
                        resolve(data);
                        console.log(data.data[0]);
                        alert("Login Successfull")
                        const path = `profile`;
                        this.props.history.push(path);
                    }
                }).catch(err => {
                    console.log("Error occured", err);
                    reject(err)
                })
        })
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 8 ? "minimum 8 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    };
    onNewUserClicked = (e) => {
        e.preventDefault()
        const path = `newuser`
        this.props.history.push(path)
    }

    render() {
        return (
            <div className={classes.loginSection}>
                <div className={classes.loginContaint}>

                    <form action="" onSubmit={this.onUserLogin}>
                        <div className={classes.infoTextDiv}>
                            <h3>Login to Your Account</h3>
                        </div>
                        <div className={classes.inputFieldSection}>
                            <label htmlFor="email">Email</label>
                            <input
                                className={this.state.formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                required
                                onChange={this.handleChange}
                            />
                            {this.state.formErrors.email.length > 0 && (
                                <span className="errorMessage">{this.state.formErrors.email}</span>
                            )}
                        </div>
                        <div className={classes.inputFieldSection}>
                            <label htmlFor="password">Password</label>
                            <input
                                className={this.state.formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                required
                                noValidate
                                onChange={this.handleChange}
                            />
                            {this.state.formErrors.password.length > 0 && (
                                <span className="errorMessage">{this.state.formErrors.password}</span>
                            )}
                        </div>
                        <div className={classes.inputFieldSection}>
                            <button>Login</button>
                        </div>
                        <div className={classes.inputFieldSection}>
                            <p>New user please create account...</p>
                            <button onClick={this.onNewUserClicked}>Create Account</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps, actionCreators)(Login);
