import apiClient from "../../interceptor/interceptor";

export const getNewsList = (data) =>
    apiClient.get("/News", data);

export const getNewsDetails = (id) => {
    return apiClient.get(`/News/${id}`);
};

export const getFavoriteNews = (data) =>
    apiClient.get("/SharePanel/GetMyFavoriteNews", data);

export const addNewsFavorite = (newsId) =>
    apiClient.post("/News/AddFavoriteNews", null, {
        params: {
            NewsId: newsId,
        },
    });

export const deleteFavoriteNews = (favoriteId) =>
    apiClient.delete("/News/DeleteFavoriteNews", {
        data: {
            deleteEntityId: favoriteId,
        },
    });