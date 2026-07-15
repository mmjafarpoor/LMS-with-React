import React from 'react'
import Style from './RegularCard.module.css'
import RatingStars from '../../../common/RatingStars/RatingStars'
import { useNavigate } from 'react-router-dom'

const RegularCard = ({courseId, title, describe, cost, currentRegistrants, imageAddress, courseRate, teacherId, teacherName}) => { 
    
    const navigate = useNavigate();
    const GoToCourseDetails = () => {
        navigate(`/Courses/${courseId}`);
    };
    const GoToTeacherDetails = (e) => {
        e.stopPropagation();
        navigate(`/Teachers/${teacherId}/${teacherName.replaceAll(" ", "-")}`);
    };

    const discountCalculator = () => {
        const price = Number(String(cost).replace(/[,.]/g, ""));
        return Math.round(price * 1.2).toLocaleString();
    };

    return (
        <div className={Style.regularCard}>
            <div onClick={GoToCourseDetails} className={Style.imageWrapper}>
                <img src={imageAddress || "/images/javaScriptProductCard.png"} onError={(e) => {e.target.src = "/images/javaScriptProductCard.png";}}  className={Style.productImg} alt="ProductCard Image"/>
            </div>
            <div onClick={GoToCourseDetails} className={Style.productMeta}>
                <div className={Style.metaHeading}>
                    <span className={Style.productTitle}>{title || "عنوان دوره"}</span>
                    <span className={Style.productDescription}>{describe || "توضیحات دوره"}</span>
                </div>
                <div className={Style.productInfo}>
                    <RatingStars courseRate={courseRate}/>
                    <div onClick={GoToTeacherDetails} className={Style.courseInstructor}>
                        <img src="/images/teaching.png" alt="Course Instructor" className={Style.courseInstructorIcon}/>
                        <span className={Style.instructorName}>{teacherName}</span>
                    </div>
                </div>
                <div className={Style.productAction}>
                    <div className={Style.participantsCount}>
                        <img src="/images/participantIcon.png" alt="Participant Icon" className={Style.participantIcon}/>
                        <span className={Style.numberOfParticipants}>{currentRegistrants}</span>
                    </div>
                    <div className={Style.productPrice}>
                        <div className={Style.olderPrice}>
                            <span className={Style.olderPriceSpan}>{discountCalculator()} تومان</span>
                            <div className={Style.offerLine}></div>
                        </div>
                        <span className={Style.newPrice}>{cost} تومان</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegularCard