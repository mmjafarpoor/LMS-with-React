import React from 'react'
import Style from './FullLineCard.module.css'
import RatingStars from '../../../common/RatingStars/RatingStars';

const FullLineCard = ({title,describe,cost,currentRegistrants,imageAddress , courseRate = 1}) => {

  return (
    <div className={Style.fullLineCard}>
      <div className={Style.imageWrapper}>
        <img src={imageAddress} alt="Product Image" className={Style.productImage}/>
      </div>
      <div className={Style.productMeta}>
        <div className={Style.productHeading}>
          <span className={Style.productTitle}>{title}</span>
          <span className={Style.productDescription}>{describe}</span>
        </div>
        <div className={Style.productInfo}>
          <div className={Style.productPrice}>
            <div className={Style.olderPrice}>
              <span className={Style.olderPriceSpan}>40.000 تومان</span>
              <div className={Style.priceOfferLine}></div>
              <div className={Style.discountPercentage}>10%</div>
            </div>
            <div className={Style.newPrice}>{cost} تومان</div>
          </div>
          <div className={Style.participantsCount}>
            <img src="/images/participantIcon.png" alt="Participants Icon" className={Style.participantsIcon}/>
            <span className={Style.numberOfParticipants}>{currentRegistrants}</span>
          </div>
        </div>
        <div className={Style.courseFilters}>
          <div className={Style.courseInstructor}>
            <img src="/images/teaching.png" alt=" Instructor Icon" className={Style.instructorIcon}/>
            <span className={Style.instructorName}>دکتر بحرالعلوم</span>
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