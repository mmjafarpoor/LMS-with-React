import apiClient from "../../interceptor/interceptor";

export const getNewsList = ({pageNumber , rowsOfPage , sortingCol , sortType}) =>{
    return apiClient.get("/News",{
        params:{
            PageNumber:pageNumber,
            RowsOfPage:rowsOfPage,
            SortingCol:sortingCol,
            SortType:sortType,
        }
    });
}
export const getNewsDetails = (id) => {
    return apiClient.get(`/News/${id}`);
};

export const getFavoriteNews = (data) =>{
    return apiClient.get("/SharePanel/GetMyFavoriteNews", data);
}

export const addNewsFavorite = (newsId) =>{
    return apiClient.post("/News/AddFavoriteNews", null, {
        params: {
            NewsId: newsId,
        },
    });
}

export const deleteFavoriteNews = (favoriteId) =>{
    return apiClient.delete("/News/DeleteFavoriteNews", {
        data: {
            deleteEntityId: favoriteId,
        },
    });
}

export const addNewsLike = (newsId) =>{
    return apiClient.post(`/News/NewsLike/${newsId}`);
}

export const deleteNewsLike = (deleteNewsId) =>{
    return apiClient.delete("/News/DeleteLikeNews",{deleteEntityId : deleteNewsId});
}

export const addNewsDisLike = (newsId) =>{
    return apiClient.post(`/News/NewsDissLike/${newsId}`);
}

export const getNewsComment = (params) =>{
    return apiClient.get("/News/GetNewsComments",{params,});
}

export const addNewsComment = (params) =>{
    return apiClient.post("/News/CreateNewsComment",params);
}

export const addNewsLikeComment = (CommentId ,LikeType) =>{
    return apiClient.post(`/News/CommentLike/${CommentId}`,null,{params:{LikeType}});
}