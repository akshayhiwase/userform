import React, { Component } from 'react';
import classes from './Profile.module.css';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onLogoutClicked = () => {
        alert("Logout Succesfully")
        const path = `/`
        this.props.history.push(path)
    }
    onEditProfileClicked = () => {
        const path = `/editprofile`
        this.props.history.push(path)
    }
    render() {
        return (
            <div className={classes.profileContainer}>
                <div className={classes.profileSection}>
                    <div className={classes.profileblock}>
                        <div className={classes.profilePicSection}>
                            <img src="https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png" alt="User" />
                        </div>
                        <div className={classes.informationSection}>
                            <div className={classes.information}>
                                <h3>Hello,</h3>
                                <h1>{this.props.loginUser.firstname}   {this.props.loginUser.lastname}</h1>
                            </div>
                            <div className={classes.personelInfoSection}>
                                <div className={classes.personalinformation}>
                                    <p><i className="far fa-envelope"></i>  {this.props.loginUser.email}</p>
                                </div>
                                <div className={classes.personalinformation}>
                                    <p><i className="fas fa-phone-alt"></i>  {this.props.loginUser.number}</p>
                                </div>
                                <div className={classes.personalinformation}>
                                    <p><i className="far fa-calendar-alt"></i>  {this.props.loginUser.dob}</p>
                                </div>
                                <div className={classes.personalinformation}>
                                    <p><i className="fas fa-home"></i>  {this.props.loginUser.country} ({this.props.loginUser.state})</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className={classes.profileUpdateSection}>
                        <div className={classes.profileBtn}>
                            <button onClick={this.onEditProfileClicked}>Edit Profile</button>
                        </div>
                        <div className={classes.profileBtn}>
                            <button onClick={this.onLogoutClicked}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const getDetailsFromGlobalStore = (store) => {
    return {
        loginUser: store.user
    }
}
export default connect(getDetailsFromGlobalStore)(Profile)
