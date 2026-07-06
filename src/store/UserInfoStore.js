import { create } from "zustand";
import {userApiData} from '../core/services/dashBoardService/dashBoardApi'
import { dashBoardDataMapper } from "../core/services/dashBoardService/dashBoardDataMapper";
import { toast } from "react-toastify";

const userInfoStore = create((set) => ({
    user: null,
    loading: false,

    fetchUser : async () => {
        set({ loading: true });

        try {
            const response = await userApiData();
            

            const mappedUser = dashBoardDataMapper(response.data);
            console.log("userInfo =",response.data);
            
            set({
                user:mappedUser,
            });
        } catch (error) {
            toast.error("در نمایش اطلاعات کاربر مشکلی بوجود امد")
            console.log(error)
        }
        finally{
            set({ loading: false });
        }
    },
    updateUser: (data) =>
        set((state) => ({
            user: {
            ...state.user,
            ...data,
        },
    })),
    clearUser: () =>set({user: null,}),
}))

export default userInfoStore;