import apiClient from "../interceptor/interceptor";

const getCourseList = ({pageNumber , rowOfPage }) => {
    return apiClient.get("/Home/GetCoursesWithPagination",{
        params:{
            RowsOfPage:rowOfPage,
            PageNumber:pageNumber,
        }
    })
}
const getCoursesWithPagination = ({pageNumber , rowOfPage }) => {
    return apiClient.get("/Home/GetCoursesWithPagination",{
        params:{
            RowsOfPage:rowOfPage,
            PageNumber:pageNumber,
        },
    });
};
const getAllTechs = () => {
    return apiClient.get("/Home/GetTechnologies");
}
export {getCoursesWithPagination,getAllTechs,getCourseList};