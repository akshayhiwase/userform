import React from 'react';
import classes from './UserInfo.module.css';
import States from './States.json';
import Axios from "axios";


class UserInfo extends React.Component {

    state = {
        alreadyUser: {}
    }

    componentWillMount = () => {
        localStorage.getItem("myUser") === null ? this.setState({ alreadyUser: '' })
            : this.setState({ alreadyUser: JSON.parse(localStorage.getItem("myUser")) })
    }

    getApiResponse = (user) => {
        Axios.post("http://localhost:4000/adduser", user)
            .then((response) => {
                console.log("this is submit data", response.data);
            }).catch(err => console.log(err))
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        if (this.state.alreadyUser === {} || localStorage.getItem("myUser") == null) {
            const userData = {
                email: JSON.parse(localStorage.getItem("newUser")),
                name: e.target.username.value,
                dob: e.target.dob.value,
                gender: e.target.gender.value,
                country: e.target.country.value,
                state: e.target.state.value
            }
            this.getApiResponse(userData)
            alert("Your Information Added Successfully")
            e.target.reset()

        } else {
            alert("Already Present")
        }

    }

    render() {
        const user = <div className={classes.user}>
            <h1>Welcome</h1>
            <img src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png" alt="User" />
            <h3>{this.state.alreadyUser.email}</h3>
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
                        {
                            this.state.alreadyUser === {} || localStorage.getItem("myUser") == null ?
                                <h3>Please Fill Your Details</h3>
                                : <h3>Hello {this.state.alreadyUser.name}</h3>
                        }
                    </div>
                    <form action="" onSubmit={this.onFormSubmit}>
                        <div className={classes.formData}>
                            <div className={classes.inputFill}>
                                <label>Username</label>
                                <input type="text" required name="username" value={this.state.alreadyUser.name} />
                            </div>
                            <div className={classes.inputFill}>
                                <label>DOB</label>
                                <input type="date" required name="dob" value={this.state.alreadyUser.dob} />
                            </div>

                            <div className={classes.genderSelect}>
                                <label htmlFor="">Gender</label>
                                <div className={classes.gender}>
                                    <div>
                                        <input type="radio" id="male" name="gender" value="male" required />
                                        <label>Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" name="gender" value="female" required />
                                        <label>Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="other" name="gender" value="other" required />
                                        <label>Other</label>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.inputFill}>
                                <label>Country</label>
                                <select className={classes.userSelectMenu} name="country" required value={this.state.alreadyUser.country}>
                                    <option value="Select country">Select Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className={classes.inputFill}>
                                <label>State</label>
                                <select className={classes.userSelectMenu} name="state" required value={this.state.alreadyUser.state}>
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