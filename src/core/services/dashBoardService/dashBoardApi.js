import apiClient from "../../interceptor/interceptor";

export const userApiData = (data) =>
    apiClient.get("/SharePanel/GetProfileInfo", data);

export const editUserApiData = (data) =>
    apiClient.put("/SharePanel/UpdateProfileInfo", data);

export const addProfilePic = (data) => {
    const formData = new FormData();
    formData.append("formFile", data);

    return apiClient.post("/SharePanel/AddProfileImage",formData);
};

export const selectProfilePic = (data) => {
    const formData = new FormData();
    formData.append("ImageId", data);

    return apiClient.post("/SharePanel/SelectProfileImage",formData);
};

export const deleteProfilePic = (id) => {
    const formData = new FormData();
    formData.append("DeleteEntityId", id);

    return apiClient.delete("/SharePanel/DeleteProfileImage",{data: formData});
};

export const getFavoriteCourse = (data) =>
    apiClient.get("/SharePanel/GetMyFavoriteCourses", data);

export const deleteFavoriteCourse = (data) =>{
    const formData = new FormData();
    formData.append("CourseFavoriteId", data);

    return apiClient.delete("/Course/DeleteCourseFavorite",{data: formData});
};

