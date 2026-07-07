import apiClient from "../../interceptor/interceptor";

export const loginGmail = (data) =>
    apiClient.post("/Sign/Login", data);

export const loginVerifyMessage = (data) =>
    apiClient.post("/Sign/LoginTelegram/{code}/{phoneOrGmail}", data);

export const registerGmail = (data) =>
    apiClient.post("/Sign/SendVerifyMessage", data);

export const registerVerifyMessage = (data) =>
    apiClient.post("/Sign/VerifyMessage", data);

export const registerLastStep = (data) =>
    apiClient.post("/Sign/Register", data);

export const forgetGmail = (data) =>
    apiClient.post("/Sign/ForgetPassword", data);

export const forgetNewPassWord = (data) =>
    apiClient.post("/Sign/Reset", data);


