import React, { useEffect, useRef, useState } from 'react'
import Style from "../styles/Home.module.css";
import SliderData from "../Data/SliderData"
import clsx from "clsx"
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AnimateRoadmap from '../components/common/AnimateRoadmap/AnimateRoadmap';
import StudentComment from '../components/Home/StudentComment/StudentComment';
import WagonSlider from '../components/Home/WagonSlider/WagonSlider';
import NewsCards from '../components/Home/NewsCards/NewsCards';
import TeachersCards from '../components/Home/TeachersCards/TeachersCards';
import CoursesCards from '../components/Home/CoursesCards/CoursesCards';

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
    }, 2250);
  };
  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };
  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

  const imgAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    transition: {
      duration: 0.5
    }
  };
  

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
          <div className={Style.sliderGallery} style={{width : galleryWidth , transform: `translateX(+${currentSlide * sliderContainerWidth}px)`,transition: "transform 0s ease"}} onMouseEnter={stopSlider} onMouseLeave={startSlider}>
            {SliderData.map((item) =>(
              <div key={item.id} className={Style.sliderItem} style={{width : itemWidth}}>
                <div className={Style.sliderItemImageWrapper}>
                  <motion.img
                  key={currentSlide}
                  initial={imgAnimation.initial}
                  animate={imgAnimation.animate}
                  exit={imgAnimation.exit}
                  src={item.imageURL} alt="Slider-Image" className={Style.sliderItemImage}/>
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
      {/* <div className={Style.bestInstructorsContainer}></div> */}
      <div className={Style.TeachersCards}>
        <TeachersCards />
      </div>
      <div className={Style.selfPresentationContainer}>
        <div className={Style.selfPresentationBanner}>
          <img src="/images/selfPresentationBanner.png" alt="Self-Presentation-Banner" className={Style.selfPresentationBannerImage}/>
          <div className={Style.twoDecadesOfExperience}>
            <span className={Style.twoDecadesOfExperienceText}>+20 <br/>
              سال سابقه  اموزش<br/>
              در برنامه نویسان
            </span>
          </div>
        </div>
        <div className={Style.selfPresentation}>
          <div className={Style.selfPresentationHeading}>
            <span className={Style.selfPresentationTitle}>چرا به یک جامعه‌ی یادگیرندگان مادام‌العمر نیاز داریم؟</span>
            <span className={Style.selfPresentationDescription}>زیرا برنامه‌نویسی فقط یک مهارت فنی نیست؛ راهی است برای تقویت تفکر منطقی، حل مسئله و ساختن آینده‌ای روشن‌تر. با همراهی یک جامعه فعال و پشتیبان، می‌توانی بر چالش‌ها مسلط شوی و مسیر رشد خود را با اعتماد بیشتری طی کنی.</span>
          </div>
          {[{src : "/images/learnToLead.png" , alt : "Learn-To-Lead" , title : "رهبرِ مؤثرِ آینده باش" , description : "کلاس‌های برنامه‌نویسی ما طوری طراحی شده‌اند که بتوانی در هر سطحی که هستی، مهارت‌هایی واقعی و کاربردی کسب کنی. یاد می‌گیری چگونه بر ایده‌هایت مسلط شوی، پروژه بسازی و قدم‌به‌قدم آینده شغلی‌ات را متحول کنی."},
            {src : "/images/pathOfGrowth.png" , alt : "Path-Of-Growth" , title : "مسیر پیشرفت شفاف و قابل اندازه‌گیری" , description : "در هر مرحله می‌توانی رشد خود را ببینی، پروژه‌هایت را توسعه دهی و نتایج واقعی به دست بیاوری. هدف ما این است که تو نه فقط برنامه‌نویسی، بلکه طرز فکر یک سازنده و خالق را به دست بیاوری."}
          ].map((pros,index) => (
            <div kdy={index} className={Style.prosAboutUs}>
              <div className={Style.prosAboutUsHeading}>
                <img src={pros.src} alt={pros.alt} className={Style.prosAboutUsIcon}/>
                <span className={Style.prosAboutUsTitle}>{pros.title}</span>
              </div>
              <span className={Style.prosAboutUsDescription}>{pros.description}</span>
            </div>
          ))}
          <div className={Style.knowMoreAboutOurTrip}>
            <span className={Style.knowMoreAboutOurTripText}>درباره سفر ما بیشتر بدانید</span>
          </div>
        </div>
      </div>
      <div className={Style.roadMapContainer}>
        <div className={Style.roadMapHeading}>
          <div className={Style.roadMapTitleContainer}>
            <span className={Style.roadMapTitle}>نقشه راه شما</span>
            <img src="/images/blueLine.png" className={Style.roadMapTitleBackGround}/>
          </div>
          <span className={Style.roadMapDescription}>ما اینجا هستیم تا بشما کمک کنیم راه خود را پیدا کنید</span>
        </div>
        <AnimateRoadmap/>
      </div>
      <div className={Style.CoursesCards}>
        <CoursesCards />
      </div>
      <div className={Style.wagonSlider}>
        <WagonSlider />
      </div>
      <div className={Style.studentComment}>
        <StudentComment/>
      </div>
      <div className={Style.newsCard}>
        <NewsCards />
      </div>
    </div>
  )
}

export default Home