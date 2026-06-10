import React from 'react'
import Style from './FullLineCard.module.css'

const FullLineCard = () => {
  return (
    <div className={Style.fullLineCard}>
      <div className={Style.imageWrapper}>
        <img src="/images/javaScriptProductCard.png" alt="Product Image" className={Style.productImage}/>
      </div>
      <div className={Style.productMeta}>
        <div className={Style.productHeading}>
          <span className={Style.productTitle}>آموزش Node.js</span>
          <span className={Style.productDescription}>Node.js یک پلتفرم قدرتمند برای توسعهٔ برنامههای سرور با استفاده از جاوااسکریپت است. با استفاده از Node.js، میتوانید اپلیکیشنهای سریع و مقیاسپذیر بسازید. یادگیری آن آسان است، بهخصوص اگر با جاوااسکریپت آشنا باشید.</span>
        </div>
        <div className={Style.productInfo}>
          <div className={Style.productPrice}>
            <div className={Style.olderPrice}></div>
            <div className={Style.newPrice}></div>
          </div>
          <div className={Style.participantsCount}>
            <img src="/images/participantIcon.png" alt="Participants Icon" className={Style.participantsIcon}/>
            <span className={Style.numberOfParticipants}>22</span>
          </div>
        </div>
        <div className={Style.courseFilters}>
          <div className={Style.courseInstructor}>
            <img src="" alt="" className="instructorIcon" />
            <span className="instructorName"></span>
          </div>
          <div className="courseRating"></div>
        </div>
        <div className={Style.productAction}></div>
      </div>
    </div>
  )
}

export default FullLineCard