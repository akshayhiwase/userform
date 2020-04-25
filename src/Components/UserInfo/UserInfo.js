import React from 'react';
import classes from './UserInfo.module.css';
import States from './States.json'


class UserInfo extends React.Component {
    state = {
        userInfo: [],

    }
    onFormSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username: e.target.username.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            country: e.target.country.value,
            state: e.target.state.value
        }
        console.log(userData)
        alert("Your Information Added Successfully")
    }

    render() {
        const state = States.map((data, i) => {
            return (
                <option key={i} value={data.key} required>{data.name}</option>
            )
        })

        return (
            <div className={classes.infoContainer}>
                <div className={classes.userSection}>
                    <form action="" onSubmit={this.onFormSubmit}>
                        <div className={classes.formData}>
                            <div className={classes.inputFill}>
                                <label>Username</label>
                                <input type="text" required name="username" />
                            </div>
                            <div className={classes.inputFill}>
                                <label>DOB</label>
                                <input type="date" required name="dob" />
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
                                <select className={classes.userSelectMenu} name="country" >
                                    <option value="Select country">Select Country</option>
                                    <option value="india" required>India</option>
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
                                <button >Add User</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default UserInfo;