import React, { useState } from 'react'
import Style from '../styles/Courses.module.css'
import SearchInput from '../components/CoursesPage/ProductSearchBox/SearchInput'
import SearchFilterInput from '../components/CoursesPage/SearchTheFilter/SearchFilterInput'
import ComplexOfFilters from '../components/CoursesPage/ComplexOfFilters/ComplexOfFilters'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Courses = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const toggleFiltersHandler = () => {
      setIsCategoriesOpen(prev => !prev)
    }

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
      <div className={Style.productContainer}>
        <div className={Style.productFilterContainer}>
          <div className={Style.searchTheFilters}>
            <SearchFilterInput/>
          </div>
          <motion.div className={Style.filtersContainer}  animate={{height: isCategoriesOpen ? "auto" : 40}} transition={{duration : 0.7}}>
            <div className={Style.filtersDisplaySwitch} onClick={toggleFiltersHandler}>
              <span className={Style.filterTitle}>دسته بندی ها</span>
              <img src="/images/displayArrow.png" style={{transform: isCategoriesOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display-Switch" className={Style.filterDisplaySwitchIcon}/>
            </div>
            <ComplexOfFilters/>
            <div className={Style.showMoreFilters}>
              <span className={Style.showMoreFiltersText}>مشاهده‌ بیشتر</span>
            </div>
          </motion.div>
        </div>
        <div className={Style.productMain}>
          <div className={Style.productsSearchAndDisplay}>
            <div className={Style.productListDisplaySwitch}>
              <div className={Style.displayRegularMode}>
                <img src="/images/regularCard.png" alt="Display-Regular-Card" className={Style.switchModeIcon}/>
              </div>
              <div className={Style.displayFullLineMode}>
                <img src="/images/fullLineCard.png" alt="Display-Full-Line-Card" className={Style.switchModeIcon}/>
              </div>
            </div>
            <div className={Style.productSearchBar}>
              <SearchInput/>
            </div>
            <div className={Style.viewAsMenu}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses