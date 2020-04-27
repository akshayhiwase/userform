import Axios from 'axios';

const newUser = (user) => {
    Axios.post("http://localhost:4000/adduser", user)
        .then((response) => {
            console.log("this is submit data", response.data);
        }).catch(err => console.log(err))
}

export default newUser;