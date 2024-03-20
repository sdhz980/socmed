import axios from 'axios';
import { md5 } from 'js-md5';
import { BASE_URL } from './ENV';

interface loginDetailProp {
    username:string;
    password:string;
}

const userLogin = async (props : loginDetailProp) => {
    const token = md5(props.password);
    let user : {
        username: string;
        token: string;
    }[];
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        user = response.data.filter((item:{ username:string}) => item.username == props.username);
        // return `token : ${token} user token : ${user[0].token}`;
        if (!user.length) return 'invalid login';
        if (user && user[0].token === token) return user[0];
        return 'invalid password';
    } catch (error) {}
}

export default userLogin