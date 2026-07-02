import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

    const onSuccess = (response) => response;

    const onError = (error)=>{
        if (!error.response) {
            toast.error("ارتباط با سرور برقرار نشد");
            return Promise.reject(error);
        }

        const status = error.response.status;

        if(status >= 400 && status <= 500){
            toast.error("خطا از سمت سرور لطفا دوباره امتحان کنید")
        }
        if (error.response.status === 403) {
            toast.error("مجوز دسترسی به این بخش را ندارید");
            setTimeout(()=>{
                window.location.href = "/auth";
            },2000)
        }
        
        return Promise.reject(error);
    }
    apiClient.interceptors.response.use(onSuccess , onError);

    apiClient.interceptors.request.use((config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    });

export default apiClient
