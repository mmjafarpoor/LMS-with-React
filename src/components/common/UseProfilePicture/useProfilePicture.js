import {useRef, useState , useEffect} from "react";
import { toast } from "react-toastify";
import useUserInfoStore from "../../../store/UserInfoStore";
const useProfilePicture = () => {
    const fileInputRef = useRef(null);
    
    const updateUser = useUserInfoStore((state) => state.updateUser);
    const userProfilePicture = useUserInfoStore((state) => state.user.userProfilePicture);
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
    const confirmImage = () => {
        if (!selectedFile) return;

        setPictures((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                file: selectedFile,
                preview,
                isSelected: prev.length === 0,
            },
        ]);

        setPreview(null);
        setSelectedFile(null);
        fileInputRef.current.value = "";
    };
    const selectProfilePicture = (id) => {
        setPictures((prev) =>
            prev.map((picture) => ({
                ...picture,
                isSelected: picture.id === id,
            }))
        );
    };
    const deletePicture = (id) => {
        setPictures((prev) => {
            const deletedPicture = prev.find((picture) => picture.id === id);
            const newPictures = prev.filter((picture) => picture.id !== id);

            if (deletedPicture && deletedPicture.preview === userProfilePicture) {
                toast.success("عکس پروفایل حذف شد.");
                updateUser({
                    userProfilePicture: "/images/defaultAvatar.webp",
                });
            }
            else if (
                newPictures.length > 0 &&
                !newPictures.some((picture) => picture.isSelected)
            ) {
                return newPictures.map((picture, index) => ({
                ...picture,
                isSelected: index === 0,
                }));
            }
            return newPictures;
        });
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

    const updateProfile = () => {
        const profilePicture = pictures.find(
            (picture) => picture.isSelected
        );

        if (!profilePicture) {
            updateUser({
                userProfilePicture: "/images/defaultAvatar.webp",
            });

            toast.success("عکس پروفایل حذف شد.");

            return;
        }
            
        updateUser({
            userProfilePicture: profilePicture.preview,
        });

        toast.success("عکس پروفایل با موفقیت ذخیره شد.");
        console.log(useUserInfoStore.getState().user);
    }
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

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

export default useProfilePicture;