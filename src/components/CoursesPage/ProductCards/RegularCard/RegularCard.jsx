import React from 'react'
import Style from './RegularCard.module.css'

const RegularCard = () => { 
    
    return (
        <div className={Style.regularCard}>
            <div className={Style.imageWrapper}>
                <img src="/public/images/javaScriptProductCard.png" className={Style.productImg} alt="ProductCard Image"/>
            </div>
            <div className={Style.productMeta}>
                <div className={Style.metaHeading}>
                    <span className={Style.productTitle}>دوره آموزش جامع HTML5</span>
                    <span className={Style.productDescription}>خواه شما مبتدی باشید یا به دنبال پیشرفت در مهارت‌های برنامه‌نویسی خود باشید، دوره‌های آموزشی ما شما را در هر مرحله همراهی می‌کنند.</span>
                </div>
                <div className={Style.productInfo}>
                    <div className={Style.productRating}></div>
                    <div className={Style.courseInstructor}>
                        <img src="/images/teaching.png" alt="Course Instructor" className={Style.courseInstructorIcon}/>
                        <span className={Style.instructorName}>دکتر بحرالعلوم</span>
                    </div>
                </div>
                <div className={Style.productAction}>
                    <div className={Style.participantsCount}>
                        <img src="/images/participantIcon.png" alt="Participant Icon" className={Style.participantIcon}/>
                        <span className={Style.numberOfParticipants}>222</span>
                    </div>
                    <div className={Style.productPrice}>
                        <div className={Style.olderPrice}>
                            <span className={Style.olderPriceSpan}>500.000 تومان</span>
                            <div className={Style.offerLine}></div>
                        </div>
                        <span className={Style.newPrice}>400.000 تومان</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegularCard