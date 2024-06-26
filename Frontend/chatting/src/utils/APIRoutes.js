import axios from "axios";

const token = localStorage.getItem("jwt-token");

export const axiosInstance = axios.create({
  headers: {
    authorization: { token },
  },
});
// https://letstalk-backend-nvyb.onrender.com
export const host = "https://letstalk-backend-nvyb.onrender.com";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
