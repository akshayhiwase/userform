import Axios from 'axios';


const registerdUser = (user) => {
    return new Promise((resolve, reject) => {
        Axios.get("http://localhost:4000/user?mail=" + user.email)
            .then(data => {
                if (data.data.length === 0) {
                    // localStorage.removeItem("myUser")
                    // localStorage.setItem("newUser", JSON.stringify(user))
                    // const path = `userinfo`;
                    // this.props.history.push(path);
                    alert("Youre Profile is not registerd please create account")
                } else {
                    resolve(data);
                    console.log(data.data[0]);

                    // localStorage.setItem('myUser', JSON.stringify(data.data[0]));
                    alert("Your Information is already store in database")
                    // const path = `userinfo`;
                    // this.props.history.push(path);
                }

            }).catch(err => {
                console.log("Error occured", err);
                reject(err)
            })

    })
}
export default registerdUser;