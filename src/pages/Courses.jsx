import React, { useEffect, useState } from 'react'
import Style from '../styles/Courses.module.css'
import SearchInput from '../components/CoursesPage/ProductSearchBox/SearchInput'
import SearchFilterInput from '../components/CoursesPage/SearchTheFilter/SearchFilterInput'
import ComplexOfFilters from '../components/CoursesPage/ComplexOfFilters/ComplexOfFilters'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import RegularCard from '../components/CoursesPage/ProductCards/RegularCard/RegularCard'
import { getCourseList } from '../core/services/get'
import FullLineCard from '../components/CoursesPage/ProductCards/FullLineCard/FullLineCard'

const Courses = () => {
  // const [courseList, setCourseList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  
  const toggleFiltersHandler = () => {
      setIsCategoriesOpen(prev => !prev)
    }
    // const fetchCourseList = async () => {
    //   setIsLoading(true);
    //   setError(null);
    //   try{
    //     const response = await getCourseList({pageNumber:1, rowOfPage:12, });
    //       if (response.data && response.data.courseDtos) {
    //           setCourseList(response.data.courseDtos);
    //           console.log("Data Received",response.data.courseDtos)}
    //       else {throw new Error("Data structure is invalid");}
    //   }
    //   catch (err) {
    //     console.error("Fetch error:", err);
    //     setError(err.message || "Failed to load courses");
    //   }
    //   finally{
    //     setIsLoading(false);
    //   }
    // }
    // useEffect(() => {
    //     fetchCourseList();
    // }, [])
    // if (isLoading) {
    //     return <div className="text-blue-800"> در حال بارگذاری...</div>;
    // }
    // if (error) {
    //     return <div className="text-red-700"> خطا در بارگذاری: {error}</div>;
    // }
    // if (!courseList || courseList.length === 0) {
    //     return <div className={Style.noData}> محصولی یافت نشد.</div>;
    // }

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
          <div className={Style.itemsContainer}>
            <FullLineCard/>
            <FullLineCard/>
            <FullLineCard/>
            <FullLineCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses