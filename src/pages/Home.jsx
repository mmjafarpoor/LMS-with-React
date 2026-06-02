import React, { useEffect, useRef, useState } from 'react'
import Style from "../styles/Home.module.css";
import SliderData from "../Data/SliderData"
import clsx from "clsx"

const Home = () => {
  // console.log(SliderData);
  // console.log(SliderData.length);
  
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0)
  useEffect(() => {
    const calculateWidth = () => {
      if (!sliderRef.current) return;
      const newItemWidth = sliderRef.current.offsetWidth;
      setSliderContainerWidth(newItemWidth);
      console.log("Container Item:", newItemWidth);
    };

    calculateWidth();

    window.addEventListener("resize", calculateWidth);

    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);

  const galleryWidth = sliderContainerWidth > 0 ? (SliderData.length * sliderContainerWidth) : 0;
  const itemWidth = galleryWidth/(SliderData.length);

  const [currentSlide, setCurrentSlide] = useState(0);

  const startSlider = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev =>
        prev === SliderData.length - 1 ? 0 : prev + 1
      );
    }, 2500);
  };
  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };
  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

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
        <div className={Style.sliderContainer} ref={sliderRef}>
          <div className={Style.sliderGallery} style={{width : galleryWidth , transform: `translateX(+${currentSlide * sliderContainerWidth}px)`,transition: "transform 0.5s ease"}} onMouseEnter={stopSlider} onMouseLeave={startSlider}>
            {SliderData.map((item) =>(
              <div key={item.id} className={Style.sliderItem} style={{width : itemWidth}}>
                <div className={Style.sliderItemImageWrapper}>
                  <img src={item.imageURL} alt="" className={Style.sliderItemImage}/>
                </div>
                <div className={Style.sliderItemMeta}>
                  <div className={Style.sliderItemMetaHeading}>
                    <span className={Style.sliderItemTitle}>{item.name}</span>
                    <span className={Style.sliderItemDescription}>Node.js یک پلتفرم قدرتمند برای توسعهٔ برنامههای سرور با استفاده از جاوااسکریپت است. با استفاده از Node.js، میتوانید اپلیکیشنهای سریع و مقیاسپذیر بسازید. یادگیری آن آسان است، بهخصوص اگر با جاوااسکریپت آشنا باشید.</span>
                  </div>
                  <div className={Style.sliderItemPriceTagsContainer}>
                    <div className={Style.sliderItemOlderPriceContainer}>
                      <div className={Style.sliderItemOlderPrice}>{item.olderPrice}</div>
                      <div className={Style.sliderItemPriceOfferLine}></div>
                      <div className={Style.sliderItemPriceOfferPercentage}>10%</div>
                    </div>
                    <div className={Style.newPrice}>{item.price}</div>
                  </div>
                  <div className={Style.sliderItemActionsContainer}>
                    <div className={Style.sliderItemReservation}>
                      <img src="/images/addToCart.png" alt="Add-To-Cart" className={Style.sliderItemAddToCart} />
                      <span className={Style.sliderItemAddToCartText}>شروع یادگیری</span>
                    </div>
                  </div>
                  <div className={Style.carouselIndicatorsContainer}>
                    {SliderData.map((item,index) => (
                      <div onClick={() => setCurrentSlide(index)} key={item.id} className={clsx(Style.carouselIndicators,currentSlide === index ? Style.carouselIndicatorsActive : null)}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={Style.bestInstructorsContainer}></div>
      
    </div>
  )
}

export default Home