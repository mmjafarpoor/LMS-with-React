import apiClient from "../interceptor/interceptor";

const getCourseList = ({pageNumber , rowOfPage , sortingCol , sortType , query , costDown , costUp , techCount , listTech , courseLevelId , courseTypeId , statDate , endDate , teacherId}) => {
    return apiClient.get("/Home/GetCoursesWithPagination",{
        params:{
            RowsOfPage:rowOfPage,
            PageNumber:pageNumber,
            SortingCol:sortingCol,
            SortType:sortType,
            Query:query,
            CostDown:costDown,
            CostUp:costUp,
            TechCount:techCount,
            ListTech:listTech,
            courseLevelId:courseLevelId,
            CourseTypeId:courseTypeId,
            StartDate:statDate,
            EndDate:endDate,
            TeacherId:teacherId,
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