import axios from "axios"
import { BASE_URL } from "./ENV"
import { PostPropsPost } from "../types/Global.type";

export const postPublicPost = async( input : PostPropsPost) => {
    const date = new Date();
    try {
        const response = await axios.post(`${BASE_URL}/post`, 
        {
            "name": input.name,
            "username": input.username,
            "date" : date.toLocaleString(),
            "profileImage": input.profileImage,
            "content": {
              "imageUrl": input.content.imageUrl,
              "text": input.content.text
            }}
            );
        console.log(response)
    } catch (error) {
        console.log(error);
        
    }
    
}