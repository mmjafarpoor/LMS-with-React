import axios from "axios";

const API_BASE_URL = "http://188.121.104.25:3001";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.response.use(
    (data)=>{
        return data;
    },
    (error)=>{
        if(error.response && error.response.status >= 400 && error.response.status <= 500){
            console.warn("خطای دسترسی از سمت سرور");
            // window.location.href = "Login"
        }
        return Promise.reject(error);
    }
)

export default apiClient
