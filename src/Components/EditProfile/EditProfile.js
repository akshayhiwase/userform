import React from 'react';
import classes from './EditProfile.module.css';
import States from '../UserInfo/States.json';
import { emailRegex, numberRegex } from '../../Utils/Utilities/Utilities';
import { connect } from 'react-redux';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: { ...this.props.loginUser },
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
        const userData = {
            email: e.target.email.value,
            firstname: e.target.firstName.value,
            lastname: e.target.lastName.value,
            number: e.target.number.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            country: e.target.country.value,
            state: e.target.state.value
        }
        console.log(userData)
        this.setState({ account: JSON.stringify(userData) })
        sessionStorage.setItem("editedData", JSON.stringify(userData))
        alert("Your Edited profile succesfully Stored in Sesssion Storage")
        const path = `/profile`;
        this.props.history.push(path)

    }
    onUserEdited = (value) => {
        this.setState({
            account: value
        })
        console.log(value)
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
                        <h3>Edit Details</h3>
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
                                    value={this.state.account.firstname}
                                    noValidate
                                    required
                                    onChange={(e) => this.onUserEdited(e.target.value)}
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
                                    value={this.state.account.lastname}
                                    noValidate
                                    required
                                    onChange={(e) => this.onUserEdited(e.target.value)}
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
                                    value={this.state.account.email}
                                    noValidate
                                    required
                                // onChange={this.onUserEdited}
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
                                    value={this.state.account.password}
                                    required
                                    onChange={(e) => this.onUserEdited(e.target.value)}
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
                                    value={this.state.account.number}
                                    noValidate
                                    required
                                    onChange={(e) => this.onUserEdited(e.target.value)}
                                />
                                {this.state.formErrors.number.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.number}</span>
                                )}
                            </div>
                            <div className={classes.inputFill}>
                                <label>DOB</label>
                                <input type="date" required name="dob" value={this.state.account.dob} onChange={(e) => this.onUserEdited(e.target.value)} />
                            </div>

                            <div className={classes.genderSelect}>
                                <label htmlFor="">Gender</label>
                                <div className={classes.gender}>
                                    <div>
                                        <input type="radio" name="gender" value="male" required />
                                        <label>Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" value="female" required />
                                        <label>Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" value="other" required />
                                        <label>Other</label>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.inputFill}>
                                <label>Country</label>
                                <select className={classes.userSelectMenu} name="country" required value={this.state.account.country} onChange={(e) => this.onUserEdited(e.target.value)}>
                                    <option value="Select country">Select Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className={classes.inputFill}>
                                <label>State</label>
                                <select className={classes.userSelectMenu} name="state" required value={this.state.account.state} onChange={(e) => this.onUserEdited(e.target.value)}>
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

const getDetailsFromGlobalStore = (store) => {
    return {
        loginUser: store.user
    }
}
export default connect(getDetailsFromGlobalStore)(EditProfile)