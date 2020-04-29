import React from 'react';
import classes from './EditProfile.module.css';
import States from '../UserInfo/States.json';
import { emailRegex, numberRegex } from '../../Utils/Utilities/Utilities';
import { connect } from 'react-redux';
import newUser from '../../Utils/NewUser/NewUser';
import { loadUser } from '../../Redux/Actions/Actions';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'




class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: { ...this.props.loginUser },
            genderChanged: false,
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
        console.log(e.target.firstName.value)
        e.preventDefault()
        const userData = {
            firstname: e.target.firstName.value,
            lastname: e.target.lastName.value,
            number: e.target.number.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            country: e.target.country.value,
            state: e.target.state.value
        }
        console.log(userData)
        newUser(userData)
        loadUser(userData)
        alert("Your profile succesfully updated")
        const path = `profile`;
        this.props.history.push(path)

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

    backToProfilePage = () => {
        const path = `profile`
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
                        <h3>Update Your Details</h3>
                        <small onClick={this.backToProfilePage}><i className="fas fa-arrow-circle-left"></i></small>
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
                                    defaultValue={this.state.account.firstname}
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

                                    defaultValue={this.state.account.lastname}
                                />
                                {this.state.formErrors.lastName.length > 0 && (
                                    <span className="errorMessage">{this.state.formErrors.lastName}</span>
                                )}
                            </div>
                            <div className={classes.numberSection}>
                                <label htmlFor="number">Number</label>
                                <PhoneInput
                                    country='in'
                                    inputProps={{
                                        name: 'number',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "Enter phone number",

                                    }}
                                    value={this.state.account.number}
                                    isValid={(value, country) => {
                                        if (value.match(/12345/)) {
                                            return 'Invalid value: ' + value + ', ' + country.name;
                                        } else if (value.match(/1234/)) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }}
                                />
                            </div>
                            <div className={classes.inputFill}>
                                <label>Birth Date</label>
                                <input type="date" required name="dob" defaultValue={this.state.account.dob} onChange={this.handleChange} />
                            </div>

                            <div className={classes.genderSelect}>
                                <label htmlFor="">Gender</label>
                                <div className={classes.gender}>
                                    <div>
                                        <input type="radio" name="gender" defaultValue="male" required checked={this.state.account.gender === "male" ? true : false} onChange={this.handleChange} />
                                        <label>Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" defaultValue="female" required checked={this.state.account.gender === "female" ? true : false} onChange={this.handleChange} />
                                        <label>Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" defaultValue="male" required checked={this.state.account.gender === "other" ? true : false}
                                            onChange={this.handleChange} />
                                        <label>Other</label>
                                    </div>
                                </div>

                            </div>
                            <div className={classes.inputFill}>
                                <label>Country</label>
                                <select className={classes.userSelectMenu} name="country" required defaultValue={this.state.account.country} onChange={this.handleChange} >
                                    <option value="Select country">Select Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className={classes.inputFill}>
                                <label>State</label>
                                <select className={classes.userSelectMenu} name="state" required defaultValue={this.state.account.state} onChange={this.handleChange} >
                                    <option value="state">Select States</option>
                                    {state}
                                </select>
                            </div>
                            <div className={classes.addUserButton}>
                                <button>Submit</button>
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