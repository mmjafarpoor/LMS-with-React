import apiClient from "../../interceptor/interceptor";

export const userApiData = (data) =>
    apiClient.get("/SharePanel/GetProfileInfo", data);

export const editUserApiData = (data) =>
    apiClient.put("/SharePanel/UpdateProfileInfo", data);
