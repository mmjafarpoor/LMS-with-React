import axios from "axios";

const API_BASE_URL = "service.6154e9855ae340318b17cacd749d9986";

const neshanMap = axios.create({
    baseURL: API_BASE_URL,
});

neshanMap.interceptors.response.use(
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

export default neshanMap