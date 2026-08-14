import React from 'react'
import Style from './FullLineCard.module.css'
import RatingStars from '../../../common/RatingStars/RatingStars';
import { useNavigate } from 'react-router-dom';
import { CourseFallBack } from '@/assets/Gallery';

const FullLineCard = ({courseId, title, describe , miniDescribe , cost, currentRegistrants, imageAddress, courseRate, teacherId, teacherName}) => {
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
    <div onClick={GoToCourseDetails} className={Style.fullLineCard}>
      <div className={Style.imageWrapper}>
        <img 
          src={imageAddress || CourseFallBack}
          onError={(e) => { e.currentTarget.onerror = null; e.target.src = CourseFallBack; }}
          alt="Product Image" 
          className={Style.productImage}
        />
      </div>
      <div className={Style.productMeta}>
        <div className={Style.productHeading}>
          <span className={Style.productTitle}>{title || "عنوان دوره"}</span>
          <span className={Style.productDescription}>{miniDescribe || describe || "توضیحات دوره"}</span>
        </div>
        <div className={Style.productInfo}>
          <div className={Style.productPrice}>
            <div className={Style.olderPrice}>
              <span className={Style.olderPriceSpan}>{discountCalculator()} تومان</span>
              <div className={Style.priceOfferLine}></div>
              <div className={Style.discountPercentage}>20%</div>
            </div>
            <div className={Style.newPrice}>{cost} تومان</div>
          </div>
          <div className={Style.participantsCount}>
            <img src="/images/participantIcon.png" alt="Participants Icon" className={Style.participantsIcon}/>
            <span className={Style.numberOfParticipants}>{currentRegistrants}</span>
          </div>
        </div>
        <div className={Style.courseFilters}>
          <div onClick={GoToTeacherDetails} className={Style.courseInstructor}>
            <img src="/images/teaching.png" alt=" Instructor Icon" className={Style.instructorIcon}/>
            <span className={Style.instructorName}>{teacherName}</span>
          </div>
          <RatingStars courseRate={courseRate}/>
        </div>
        <div className={Style.productAction}>
          <div className={Style.reserveTheCourse}>
            <img src="/images/addToCart.png" alt="Reserve The Course Icon" className={Style.reserveIcon}/>
            <span className={Style.reserveTheCourseSpan}>شروع یادگیری</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullLineCard