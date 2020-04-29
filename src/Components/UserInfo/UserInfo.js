import React from 'react';
import classes from './UserInfo.module.css';
import States from './States.json';
import { emailRegex, formValid, numberRegex } from '../../Utils/Utilities/Utilities';
import newUser from '../../Utils/NewUser/NewUser';



class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alreadyUser: {},
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                number: ""
            }
        };
    }
    onFormSubmit = (e) => {
        e.preventDefault()
        if (formValid(this.state)) {
            const userData = {
                email: e.target.email.value,
                firstname: e.target.firstName.value,
                lastname: e.target.lastName.value,
                password: e.target.password.value,
                number: e.target.number.value,
                dob: e.target.dob.value,
                gender: e.target.gender.value,
                country: e.target.country.value,
                state: e.target.state.value
            }
            console.log(userData)
            newUser(userData)
            alert("Your profile succesfully Created now You can Login to your account")
            const path = `/`;
            this.props.history.push(path)
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
            alert("Please fill as per Required information")
        }

    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 8 ? "minimum 8 characaters required" : "";
                break;
            case "number":
                formErrors.number = numberRegex.test(value)
                    ? ""
                    : "invalid mobile number";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };
    backToLoginPage = () => {
        const path = `/`
        this.props.history.push(path)
    }

    render() {
        const user = <div className={classes.user}>
            <h1>Welcome</h1>
            <img src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png" alt="User" />
        </div>
        const state = States.map((data, i) => {
            return (
                <option key={i} value={data.key} required>{data.name}</option>
            )
        })

        return (

            <div className={classes.infoContainer}>
                {user}
                <div className={classes.userSection}>
                    <div className={classes.head}>
                        <h3>Create Your Account</h3>
                        <small onClick={this.backToLoginPage}>Click here to go back login page...</small>
                    </div>
                    <form action="" onSubmit={this.onFormSubmit}>
                        <div className={classes.formData}>
                            <div className={classes.inputFill}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    className={this.state.formErrors.firstName.length > 0 ? "error" : null}
                                    placeholder="First Name"
                                    type="text"
                                    name="firstName"
                                    noValidate
                                    required
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.firstName.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.firstName}</span>
                                )}

                            </div>
                            <div className={classes.inputFill}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    className={this.state.formErrors.lastName.length > 0 ? "error" : null}
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastName"
                                    noValidate
                                    required
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.lastName.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.lastName}</span>
                                )}
                            </div>

                            <div className={classes.inputFill}>
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

                            <div className={classes.inputFill}>
                                <label htmlFor="password">Password</label>
                                <input
                                    className={this.state.formErrors.password.length > 0 ? "error" : null}
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    required
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.password.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.password}</span>
                                )}
                            </div>
                            <div className={classes.inputFill}>
                                <label htmlFor="number">Number</label>
                                <input
                                    className={this.state.formErrors.number.length > 0 ? "error" : null}
                                    placeholder="Number"
                                    type="number"
                                    name="number"
                                    noValidate
                                    required
                                    onChange={this.handleChange}
                                />
                                {this.state.formErrors.number.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.number}</span>
                                )}
                            </div>
                            <div className={classes.inputFill}>
                                <label>DOB</label>
                                <input type="date" required name="dob" />
                            </div>

                            <div className={classes.inputFill}>
                                <label htmlFor="">Gender</label>
                                <select className={classes.userSelectMenu} name="gender" required>
                                    <option value="Select country">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className={classes.inputFill}>
                                <label>Country</label>
                                <select className={classes.userSelectMenu} name="country" required>
                                    <option value="Select country">Select Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className={classes.inputFill}>
                                <label>State</label>
                                <select className={classes.userSelectMenu} name="state" required>
                                    <option value="state">Select States</option>
                                    {state}
                                </select>
                            </div>
                            <div className={classes.addUserButton}>
                                <button >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default UserInfo;