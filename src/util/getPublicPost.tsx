import axios from 'axios'
import { BASE_URL } from './ENV'

const getPublicPost = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/post`);
        return response.data
    } catch (error) {
        return;
    }
}

export default getPublicPost