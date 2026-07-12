export const dashBoardDataMapper = (data) =>{
    return {
        userName: data.fName || "کاربر جدید",
        userLastName: data.lName || "",
        userBiography: data.userAbout || "در این بخش میتوانید راجب خودتون و توانایی هاتون و همچنین انگیزتون به عنوان عضوی از آکادمی بحر را شرح دهید❤️",
        userPhoneNumber: data.phoneNumber || "*********09",
        userEmailAddress: data.email || data.gmail || "Example@gmail.com",
        userPersonalId: data.nationalCode || "",
        userLinkedIn: data.linkdinProfile || "",
        userTelegram: data.telegramLink || "",
        userBirthDay: data.birthDay || "",
        userLivingAddress: data.homeAdderess || "",
        userGender: data.gender ?? "",
        userProfilePicture: data.currentPictureAddress || "/images/defaultAvatar.webp",
        userPictureGallery: Array.isArray(data.userPicture) ? data.userPicture : [],
        userProfileProgress: data.profileCompletionPercentage || "%",
    }
}