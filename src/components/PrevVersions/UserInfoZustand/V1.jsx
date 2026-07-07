import { create } from "zustand";

const useUserInfoV1 = create((set) => ({
    user : {
        userName : "کاربر جدید",
        userLastName: "",
        userBiography: "در این بخش میتوانید راجب خودتون و توانایی هاتون و همچنین انگیزتون به عنوان عضوی از آکادمی بحر را شرح دهید❤️",
        userPhoneNumber : "*********09",
        userEmailAddress : "Example@gmail.com",
        userPersonalId: "",
        userBirthDay : "",
        userLivingAddress : "",
        userGender : "",
        userProfilePicture : "/images/defaultAvatar.webp",
    },

    updateUser : (data) =>
        set((state) => ({
            user: {
                ...state.user,
                ...data,
            },
        })),
}));

export default useUserInfoV1;