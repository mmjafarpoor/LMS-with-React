import React from 'react'
import Style from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={Style.homeContainer}>
      <div className={Style.beginTheJourney}>
        <div className={Style.beginTheJourneyTopSection}>
          <div className={Style.beginTheJourneyHeadingTitle}>
            <div className={Style.beginTheJourneyHeadingTitleFirstLine}>
              <span className={Style.headingTitleFirstLineText}>آموزش</span>
              <span className={Style.headingTitleFirstLineTextBadge}>برنامه‌ نویسی</span>
              <span className={Style.headingTitleFirstLineText}>آنلاین آسان</span>
            </div>
            <span className={Style.beginTheJourneyHeadingTitleSecondLine}>سریع و همیشه همراه شما</span>
          </div>
          <span className={Style.beginTheJourneyDescription}>در وب‌سایت ما می‌توانید دوره‌ها و کلاس‌هایی را پیدا کنید که به شما کمک می‌کنند مهارت بیاموزید پیشرفت کنید و در مسیر رشد شخصی و حرفه‌ای سرزنده بمانید.</span>
          <button className={Style.beginTheJourneyButton}>
            <span>آموزش رو شروع کنیم</span>
          </button>
        </div>
        <div className={Style.beginTheJourneyBottomSection}>
          <div className={Style.rightSideImage}></div>
          <div className={Style.activeStudents}>
            <span>1000+ <br/>دانشجوی فعال و شاغل <br/>در سر تا سر جهان</span>
          </div>
          <div className={Style.middleImage}></div>
          <div className={Style.twentyYearsOfWork}>
            <span>20+<br/>سال سابقه  اموزش<br/>در برنامه نویسان</span>
          </div>
          <div className={Style.leftSideImage}></div>
        </div>
      </div>
      <div className={Style.latestOnlineCourses}>
        <div className={Style.latestOnlineCoursesHeading}>
          <div className={Style.latestOnlineCoursesTitleContainer}>
            <img src="/images/blueLine.png" alt="Blue-Line" />
            <span>جدیترین دوره های انلاین</span>
          </div>
          <div className={Style.latestOnlineCoursesDescription}>محبوب ترین دوره های آموزشی نویسندگان متخصص ما را بررسی کنید.</div>
        </div>
        <div className={Style.sliderContainer}>
          <div className={Style.sliderGallery}>
            <div className={Style.sliderItem}>
              <div className={Style.sliderItemImageWrapper}>
                <img src="/images/reactProductCardPic.png" alt="" className={Style.sliderItemImage}/>
              </div>
              <div className={Style.sliderItemMeta}>
                <div className={Style.sliderItemMetaHeading}>
                  <span className={Style.sliderItemTitle}>آموزش Node.js</span>
                  <span className={Style.sliderItemDescription}>Node.js یک پلتفرم قدرتمند برای توسعهٔ برنامههای سرور با استفاده از جاوااسکریپت است. با استفاده از Node.js، میتوانید اپلیکیشنهای سریع و مقیاسپذیر بسازید. یادگیری آن آسان است، بهخصوص اگر با جاوااسکریپت آشنا باشید.</span>
                </div>
                <div className={Style.sliderItemPriceTagsContainer}>
                  <div className={Style.sliderItemOlderPriceContainer}>
                    <div className={Style.sliderItemOlderPrice}>40.000 تومان</div>
                    <div className={Style.sliderItemPriceOfferLine}></div>
                    <div className={Style.sliderItemPriceOfferPercentage}>10%</div>
                  </div>
                  <div className={Style.newPrice}>40.000 تومان</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home