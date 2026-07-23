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
import { toast } from 'react-toastify'
import ViewAsMenu from '../components/CoursesPage/ViewAsMenu/ViewAsMenu'
import ReactPaginate from 'react-paginate'
import useDarkStore from '../store/DarkStore'
import clsx from 'clsx'
import apiClient from '../core/interceptor/interceptor'

const Courses = () => {
  
  const [courseList, setCourseList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [displayMode, setDisplayMode] = useState("regular");
  
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [courseFilters, setCourseFilters] = useState({
    priceType: "All",
    teacherId: [],
    costDown: 0,
    costUp: 10000000,
    search: "",
  });

  const itemsPerPage = 12;

  const isDarkMode = useDarkStore((state) => state.isDarkMode);

  const toggleFiltersHandler = () => {
    setIsCategoriesOpen(prev => !prev)
  }
  const fetchCourseList = async (pageNumber = 1) => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await getCourseList({pageNumber , rowOfPage: itemsPerPage , costDown: courseFilters.costDown , costUp: courseFilters.costUp , teacherId: courseFilters.teacherId , priceType: courseFilters.priceType , query: courseFilters.search,});
        if (response.data?.courseFilterDtos) {
            setCourseList(response.data.courseFilterDtos);
            setPageCount(Math.ceil(response.data.totalCount / itemsPerPage));
            console.log("Data Received",response.data.courseFilterDtos);
          }
        }
        // else {throw new Error("Data structure is invalid");}
      catch (err) {
        console.error("Fetch error:", err);
        const errorMsg = err.message || "خطا در بارگذاری لیست دوره‌ها";
        toast.error(errorMsg);
      }
      finally{
        setIsLoading(false);
      }
  }
  const handlePageClick = async (event) => {
    const page = event.selected + 1;

    setPageIndex(event.selected);

    await fetchCourseList(page);
  };
  useEffect(() => {
      setPageIndex(0);
      fetchCourseList(1);
  }, [courseFilters]);

  const fetchCourseInstructor = async() =>{
    try {
      const response = await apiClient.get("/Home/GetTeachers");
      if(response?.data){
          setInstructorList(response.data);
      }
      console.log(response.data);
    } catch (error) {
      const errorMsg = error.message || "خطا در بارگذاری لیست دوره‌ها";
      toast.error(errorMsg);
    }
  }

  useEffect(() => {
    fetchCourseInstructor();
  }, [])

    
    // const startIndex = pageIndex * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentItems = courseList.slice(startIndex, endIndex);
    // const pageCount = Math.ceil(courseList.length / itemsPerPage);
    

    
    

    // if (isLoading) {
    //     return <div className="text-blue-800"> در حال بارگذاری...</div>;
    // }
    // if (error) {
    //     return <div className="text-red-700"> خطا در بارگذاری: {error}</div>;
    // }
    // if (!courseList || courseList.length === 0) {
    //     return <div className={Style.noData}> محصولی یافت نشد.</div>;
    // }
    const formatPrice = (price) => {
      if (price === null || price === undefined) return '';
      const numberPrice = Number(price);
      return numberPrice.toLocaleString('en-US');
    };

    const handleDisplayChange = (changeMode) => {
      if (window.innerWidth <= 700) return;
      setDisplayMode(changeMode);
    };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setDisplayMode("regular");
      }};
    handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);
    
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
              <img src={isDarkMode ? "/images/displayArrowWhite.png" : "/images/displayArrow.png"} style={{transform: isCategoriesOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display-Switch" className={Style.filterDisplaySwitchIcon}/>
            </div>
            <ComplexOfFilters instructorList={instructorList} courseFilters={courseFilters} setCourseFilters={setCourseFilters}/>
            <div className={Style.showMoreFilters}>
              <span className={Style.showMoreFiltersText}>مشاهده‌ بیشتر</span>
            </div>
          </motion.div>
        </div>
        <div className={Style.productMain}>
          <div className={Style.productsSearchAndDisplay}>
            <div className={Style.productListDisplaySwitch}>
              <div className={clsx(displayMode === 'regular' ? Style.displayModeActivated : Style.displayModeInactivated)} onClick={() => handleDisplayChange("regular")}>
                <img src={isDarkMode ? "/images/regularCardWhite.png" : "/images/regularCard.png"} alt="Display-Regular-Card" className={Style.switchModeIcon}/>
              </div>
              <div className={clsx(displayMode === 'fullLine' ? Style.displayModeActivated : Style.displayModeInactivated)} onClick={() => handleDisplayChange("fullLine")}>
                <img src={isDarkMode ? "/images/fullLineCardWhite.png" : "/images/fullLineCard.png"} alt="Display-Full-Line-Card" className={Style.switchModeIcon}/>
              </div>
            </div>
            <div className={Style.productSearchBar}>
              <SearchInput courseFilters={courseFilters} setCourseFilters={setCourseFilters}/>
            </div>
            <div className={Style.viewAsMenu}>
              <ViewAsMenu/>
            </div>
          </div>
          <div className={Style.itemsContainer}>
            {displayMode == "regular" ? (
                courseList.map((course)=>(<RegularCard key={course.courseId} {...course} cost={formatPrice(course.cost)}/>))
              ) : (
                courseList.map((course)=>(<FullLineCard key={course.courseId} {...course} cost={formatPrice(course.cost)}/>))
              )
            }
          </div>
          <ReactPaginate
            previousLabel={
              <span className={Style.prevPaginationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </span>
            }
            breakLabel="..."
            nextLabel={
              <span className={Style.nextPaginationIcon}>
                <svg style={{ transform: 'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </span>
            }
            pageCount={pageCount}
            onPageChange={handlePageClick}
            forcePage={pageIndex}
            containerClassName={Style.paginationContainer}
            pageClassName={Style.pageItem}
            pageLinkClassName="block"
            previousLinkClassName="block"
            nextLinkClassName="block"
            activeClassName={Style.activePageItem}
            disabledClassName={Style.disabledArrow}
            disableInitialClassNames={true}
            previousClassName={Style.paginationButton}
            nextClassName={Style.paginationButton}
          />
        </div>
      </div>
    </div>
  )
}

export default Courses