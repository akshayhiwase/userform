import Axios from 'axios';

const editUser = (user) => {
    Axios.delete("http://localhost:4000/user/", user.email)
        .then((response) => {
            console.log("Deleted Data", response.data);
        }).catch(err => console.log(err))
}

export default editUser;