import {useRef, useState , useEffect} from "react";
import { toast } from "react-toastify";
import userInfoStore from "../../../../store/UserInfoStore";
import {addProfilePic, selectProfilePic , deleteProfilePic} from "../../../../core/services/dashBoardService/dashBoardApi";


const ProfilePicLogic = () => {
    const fileInputRef = useRef(null);

    const {user, fetchUser} = userInfoStore();

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };
    const setImage = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.warn("فقط عکس مجاز است.");
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };
    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const discardImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);
        setSelectedFile(null);

        fileInputRef.current.value = "";
    };
    const confirmImage = async() => {
        if (!selectedFile) return;
        
        try {
            await addProfilePic(selectedFile);
            await fetchUser();

        toast.success("عکس با موفقیت اضافه شد");

        setPreview(null);
        setSelectedFile(null);
        fileInputRef.current.value = "";

        } catch (error) {
            console.log(error);
            toast.error("در اضافه کردن عکس خطایی رخ داد");
        }
    };

    const selectProfilePicture = (id) => {
        setPictures(prev =>
            prev.map(pic => ({
                ...pic,
                isSelected: pic.id === id,
            }))
        );
    };
    const deletePicture = async (id) => {
        try {
            const deletedPic = pictures.find(pic => pic.id === id);

            if (deletedPic?.isSelected) {
                setPictures(prev => prev.filter(pic => pic.id !== id)
                    .map(pic => ({
                        ...pic,
                        isSelected: false,
                    }))
                );
            }

            await deleteProfilePic(id);

            await fetchUser();

            toast.success("عکس حذف شد");
        } catch (error) {
            console.log(error);
            toast.error("حذف عکس انجام نشد");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        setImage(e.dataTransfer.files[0]);
    };

    const updateProfile = async(id) => {
        try {
            await selectProfilePic(id);
            await fetchUser();

            toast.success("عکس پروفایل تغییر کرد");
        } catch (error) {
            console.log(error);
            toast.error("خطا در تغیر عکس پروفایل");
        }
    }
    useEffect(() => {
        if (!user?.userPictureGallery) return;

        setPictures(
            user.userPictureGallery.map(pic => ({
                id: pic.id,
                preview: pic.puctureAddress,
                isSelected: pic.current,
            }))
        );
    }, [user]);

    return {
        fileInputRef,
        preview,
        selectedFile,
        pictures,
        isDragging,
        handleClick,
        handleChange,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        discardImage,
        confirmImage,
        selectProfilePicture,
        deletePicture,
        updateProfile,
    };
};

export default ProfilePicLogic;