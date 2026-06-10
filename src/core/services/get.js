import apiClient from "../interceptor/interceptor";

const getCourseList = ({pageNumber , rowOfPage , sortingCol , sortType , teacherId , costUp , costDown}) => {
    return apiClient.get("/Home/GetCoursesWithPagination",{
        params:{
            RowsOfPage:rowOfPage,
            PageNumber:pageNumber,
            SortingCol:sortingCol,
            SortType:sortType,
            TeacherId:teacherId,
            CostUp:costUp,
            CostDown:costDown,
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