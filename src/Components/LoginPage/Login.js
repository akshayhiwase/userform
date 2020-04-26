import React from 'react';
import classes from './Login.module.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


class Login extends React.Component {

    state = {
        accountUser: [],
        phone: ""
    }

    onUserLogin = (e) => {
        e.preventDefault();
        const loginUser = {
            email: e.target.email.value,
            number: this.state.phone
        }
        console.log(loginUser)
        localStorage.setItem("useremail", JSON.stringify(loginUser))
        const path = `userinfo`;
        this.props.history.push(path);
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