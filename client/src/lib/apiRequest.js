import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'https://projet-monuments-rh72.onrender.com/api',
    withCredentials: true,
})

export default apiRequest;

