import axios from 'axios';
import { md5 } from 'js-md5';
import { BASE_URL } from './ENV';

interface loginDetailProp {
    username:string;
    password:string;
}

const userLogin = async (props : loginDetailProp) => {
    const token = md5(props.password);
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        const user = response.data.find((item: any) => item.username == props.username);
        console.log(user);
        if (!user) return 'invalid login';
        if (user.token === token) return user;
        return 'invalid password';
    } catch (error) {}
}

export default userLogin