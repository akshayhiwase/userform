import React, { Component } from 'react';
import classes from './Profile.module.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={classes.profileContainer}>
                <h1>Hii This is Profile Page</h1>

            </div>
        );
    }
}

export default Profile;