import React from 'react';
import classes from './Login.module.css';
// import getApiResponce from '../Utils/Utils';




class Login extends React.Component {



    state = {
        accountUser: []
    }


    // componentWillMount = () => {
    //     getApiResponce().then((res) => {
    //         this.setState({ accountUser: Object.values(res.accountsPage) })
    //         localStorage.setItem("AccountUser", JSON.stringify(this.state.accountUser))
    //         console.log(this.state.accountUser)
    //     }).catch(err => console.log(err))
    // }

    onUserLogin = (e) => {
        e.preventDefault();
        const loginUser = {
            email: e.target.email.value,
            number: e.target.number.value
        }
        console.log(loginUser)
        const path = `userinfo`;
        this.props.history.push(path);


        // getApiResponce().then((res) => {
        //     this.setState({ accountUser: Object.values(res.accountsPage) })
        //     const LoginUser = Object.values(res.accountsPage).filter((user) => {
        //         return user.email === loginUser.username && user.password === loginUser.password
        //     })

        //     console.log(LoginUser);

        //     if (LoginUser[0].email === loginUser.username && LoginUser[0].password === loginUser.password) {

        //         alert("Login Successful")
        //         const path = ``;
        //         this.props.history.push(path);
        //     } else {
        //         alert("You Are Not Authorized To Login")
        //         e.target.reset()

        //     }

        //     localStorage.setItem("AccountUser", JSON.stringify(this.state.accountUser))
        //     console.log(this.state.accountUser)
        // }).catch(err => console.log(err))
    }

    render() {


        return (
            <div className={classes.loginSection}>
                <div className={classes.loginContaint}>
                    <div className={classes.infoTextDiv}>
                        <h3>Welcome</h3>
                    </div>
                    <form action="" onSubmit={this.onUserLogin}>
                        <div className={classes.inputFieldSection}>
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className={classes.inputFieldSection}>
                            <label htmlFor="">Mobile No</label>
                            <input type="number" name="number" required />
                        </div>
                        <div className={classes.inputFieldSection}>
                            <button className={classes.loginBtn}>Login</button>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

export default Login;