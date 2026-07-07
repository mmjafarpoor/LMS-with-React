import React from 'react'
import Style from './ProfilePicture.module.css'
import BlurModal from '../../../common/BlurModal/BlurModal';
import ProfilePicLogic from './ProfilePicLogic';
const ProfilePicture = () => {
    const {
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
    } = ProfilePicLogic();
    
    return (
        <div className={Style.profilePictureContainer}>
            <div className={Style.profileGallery}>
                <div className={isDragging? `${Style.addPicture} ${Style.dragging}`: Style.addPicture} onClick={handleClick} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <img src="/images/addPicture.svg" alt="Add-Picture" className={Style.addPictureImage}/>
                    <span className={Style.addPictureText}>اضافه کردن عکس</span>
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange}></input>
                </div>
                {preview && (
                    <BlurModal preview={preview}  discard={discardImage} confirm={confirmImage}/>
                )}
                {pictures.map((picture) => (
                    <div key={picture.id} className={picture.isSelected ? Style.selectedPicture : Style.deselectedPicture}>
                        <div className={Style.pictureContainer} onClick={() => selectProfilePicture(picture.id)}>
                            <img src={picture.preview} alt="Profile" className={Style.picture}/>
                            {picture.isSelected ? (
                                <div className={Style.selectedOption}>
                                    <div className={Style.deleteTheProfile} onClick={() => deletePicture(picture.id)}>
                                        <img src="/images/deleteTheProfile.svg" alt="Deselected-Option"  className={Style.selectedOptionPicture}/>
                                    </div>
                                    <div className={Style.selectTheProfile} onClick={() => updateProfile(picture.id)}>
                                        <img src="/images/selectTheProfile.svg" alt="Deselected-Option" className={Style.selectedOptionPicture}/>
                                    </div>
                                </div>
                            ) : (
                                <div className={Style.deselectedOption}>
                                    <img src="/images/deselectedOption.svg" alt="Deselected-Option" className={Style.deselectedOptionPicture}/>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfilePicture