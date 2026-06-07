import React from 'react'
import Style from '../styles/Courses.module.css'

const Courses = () => {
  return (
    <div className={Style.coursesContainer}>
      <div className={Style.coursesBanner}>
        <div className={Style.bannerHeading}>
          <div className={Style.bannerTitle}>
            <span>اموزش برنامه نویسی با بهترین ها</span>
            <img src="/images/blueLine.png" alt="Title-BackGround" className={Style.titleBackGround}/>
          </div>
          <div className={Style.bannerDescription}>آموزش برنامه نویسی یکی از دوره‌های محبوب در حوزه فناوری اطلاعات است. برنامه نویسی مهارتی است که به افراد امکان می‌دهد تا نرم‌افزارهای کامپیوتری را ایجاد و توسعه دهند. </div>
        </div>
        <div className={Style.bannerWrapper}>
          <img src="/images/courseBanner.png" alt="Course-Page-Banner"/>
          <div className={Style.blueDiv}>
            <img src="/images/command-line.png" alt="Command-Line"/>
          </div>
        </div>
      </div>
      <div className={Style.productContainer}></div>
    </div>
  )
}

export default Courses