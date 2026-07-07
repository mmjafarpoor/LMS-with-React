export const editUserDataMapper = (data) =>{
    const formData = new FormData();

    formData.append("FName", data.FirstName);
    formData.append("LName", data.LastName);
    formData.append("UserAbout", data.AboutMe);
    formData.append("LinkdinProfile", data.LinkedIn);
    formData.append("TelegramLink", data.Telegram);
    formData.append("ReceiveMessageEvent", false);
    formData.append("HomeAdderess", data.LivingAddress);
    formData.append("NationalCode", data.NationalCode);
    formData.append("Gender", data.gender);
    formData.append("BirthDay", data.BirthDay);
    formData.append("Latitude", data.Latitude);
    formData.append("Longitude", data.Longitude);
    
    return formData;
}