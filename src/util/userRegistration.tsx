import axios from 'axios';
import React from 'react'
import { BASE_URL } from './ENV';
import { md5 } from 'js-md5';

interface registrationDetailProp {
    name:string;
    username:string;
    password:string;
}

const userRegistration = async (props : registrationDetailProp) => {
    const token = md5(props.password); 
    try {
        const response = await axios.post(`${BASE_URL}/user`, 
        {
            "name":props.name,
            "username":props.username,
            "token":token
          });
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}

export default userRegistration