import React from 'react';
import classes from './Login.module.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Axios from 'axios';


class Login extends React.Component {

    state = {
        accountUser: [],
        phone: ""
    }
    getApiResponse(user) {
        return new Promise((resolve, reject) => {
            Axios.get("http://localhost:4000/user?mail=" + user.email)
                .then(data => {
                    if (data.data.length === 0) {
                        localStorage.setItem("newUser", JSON.stringify(user.email))
                        const path = `userinfo`;
                        this.props.history.push(path);
                    } else {
                        resolve(data);
                        localStorage.setItem('myUser', JSON.stringify(data.data[0]));
                        const path = `userinfo`;
                        this.props.history.push(path);
                    }

                }).catch(err => {
                    console.log("Error occured", err);
                    reject(err)
                })

        })
    }
    onUserLogin = (e) => {
        e.preventDefault();
        var loginUser = {
            email: e.target.email.value,
            number: this.state.phone
        }
        this.getApiResponse(loginUser)
    }

    render() {
        return (
            <div className={classes.loginSection}>
                <div className={classes.loginContaint}>
                    <div className={classes.infoTextDiv}>
                        <h3>Please Enter Your Details</h3>
                    </div>
                    <form action="" onSubmit={this.onUserLogin}>
                        <div className={classes.inputFieldSection}>
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className={classes.inputFieldSection}>
                            <PhoneInput
                                international
                                defaultCountry="IN"
                                placeholder="Enter phone number"
                                value={this.state.phone}
                                onChange={phone => this.setState({ phone })} />
                        </div>

                        <div className={classes.inputFieldSection}>
                            <button className={classes.loginBtn}>Submit</button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}


export default Login;