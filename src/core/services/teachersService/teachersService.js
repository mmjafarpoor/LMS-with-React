import apiClient from "../../interceptor/interceptor";

export const getTeachersList = (data) => {
    return apiClient.get("/Home/GetTeachers", data);
}

export const getTeacherDetails = (teacherId) => {
    return apiClient.get("/Home/GetTeacherDetails", {
        params: {TeacherId: teacherId,},
    });
};