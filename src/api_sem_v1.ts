import axios from "axios";
import { getAccessToken } from "./utils/handle_cookies";

const baseURL = import.meta.env.VITE_URL_API_SEM_V1

const api_sem_v1 = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ getAccessToken()
    }
})

api_sem_v1.interceptors.response.use((response)=>response, 
(error)=>{
    if(error.response && error.response.status === 401)
    {
        if(window.location.pathname.toLowerCase()!=='/login')
            window.location.href= '/login';
    }
    return Promise.reject(error)
})

export default api_sem_v1