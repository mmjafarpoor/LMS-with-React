import apiClient from "../../interceptor/interceptor";

export const addCourseFavorite = (data) =>
    apiClient.post("/Course/AddCourseFavorite", data);