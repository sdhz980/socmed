// import axios from "axios";
// import { BASE_URL } from "./ENV";

// export const userValidation = async (user:any) => {
//     try {
//         const response = await axios.get(BASE_URL+"/user");
//         const tmpArr = response.data;
//         return tmpArr.find((item:any) => item.token == user.token);
//     } catch (error) {
//     }
// }