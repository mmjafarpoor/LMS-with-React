import apiClient from "../../interceptor/interceptor";

export const getCourseDetail = (courseId) => {
    return apiClient.get("/Home/GetCourseDetails",{params:{CourseId: courseId,}});
}

export const addCourseFavorite = (data) => {
    return apiClient.post("/Course/AddCourseFavorite", data);
}

export const addCourseLike = (courseId) =>
    apiClient.post("/Course/AddCourseLike",null,{params:{CourseId: courseId}});

export const deleteCourseLike = (data) => {
    const formData = new FormData();
    formData.append("CourseLikeId", data);

    return apiClient.delete("/Course/DeleteCourseLike",{data: formData});
}

export const addCourseDisLike = (courseId) =>
    apiClient.post("/Course/AddCourseDissLike",null,{params:{CourseId: courseId}});

export const deleteCourseDisLike = (data) => {
    const formData = new FormData();
    formData.append("CourseDissLikeId", data);

    return apiClient.delete("/Course/DeleteCourseDissLike",{data: formData});
}

export const getCourseComment = (CourseId) => {
    return apiClient.get(`/Course/GetCourseCommnets/${CourseId}`);
}

export const addCourseComment = ({courseId , title , describe}) => {
    const formData = new FormData();
    
    formData.append("CourseId", courseId);
    formData.append("Title", title);
    formData.append("Describe", describe);

    return apiClient.post("/Course/AddCommentCourse", formData);
}
