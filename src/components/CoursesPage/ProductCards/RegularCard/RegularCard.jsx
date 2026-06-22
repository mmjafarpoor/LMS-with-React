import React from 'react'
import Style from './RegularCard.module.css'
import RatingStars from '../../../common/RatingStars/RatingStars'

const RegularCard = ({title,describe,cost,currentRegistrants,imageAddress , courseRate , teacherName}) => { 
    
    return (
        <div className={Style.regularCard}>
            <div className={Style.imageWrapper}>
                <img src={imageAddress} className={Style.productImg} alt="ProductCard Image"/>
            </div>
            <div className={Style.productMeta}>
                <div className={Style.metaHeading}>
                    <span className={Style.productTitle}>{title}</span>
                    <span className={Style.productDescription}>{describe}</span>
                </div>
                <div className={Style.productInfo}>
                    <RatingStars courseRate={courseRate}/>
                    <div className={Style.courseInstructor}>
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
                            <span className={Style.olderPriceSpan}>500.000 تومان</span>
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