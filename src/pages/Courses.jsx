import React, { useEffect, useState } from 'react'
import Style from '../styles/Courses.module.css'
import SearchInput from '../components/CoursesPage/ProductSearchBox/SearchInput'
import RegularCard from '../components/CoursesPage/ProductCards/RegularCard/RegularCard'
import { getCourseList } from '../core/services/get'
import FullLineCard from '../components/CoursesPage/ProductCards/FullLineCard/FullLineCard'
import { toast } from 'react-toastify'
import ViewAsMenu from '../components/CoursesPage/ViewAsMenu/ViewAsMenu'
import useDarkStore from '../store/DarkStore'
import clsx from 'clsx'
import apiClient from '../core/interceptor/interceptor'
import ProductFilter from '../components/CoursesPage/ProductFilter/ProductFilter'
import Pagination from '@/components/common/Pagination/Pagination'

const Courses = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const isDarkMode = useDarkStore((state) => state.isDarkMode);
  
  const [courseList, setCourseList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [displayMode, setDisplayMode] = useState("regular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [currentPos, setCurrentPos] = useState(null);

  const itemsPerPage = 12;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [sortingCol,setSortingCol] = useState("");
  const [sortType,setSortType] = useState("");

  const [courseFilters, setCourseFilters] = useState({
    priceType: "All",
    teacherId: [],
    costDown: 0,
    costUp: 10000000,
    search: "",
  });

  const [sortingOptions, setSortingOptions] = useState([
      {title: "مرتبط‌ ترین", sortingCol: "courseId", sortType: "asc" , id: "relatable"},
      {title: "محبوب ترین", sortingCol: "likeCount", sortType: "desc" , id: "favoured"},
      {title: "گران ترین", sortingCol: "cost", sortType: "desc" ,  id: "mostExpensive"},
      {title: "ارزان ترین", sortingCol: "cost", sortType: "asc" , id: "cheapest"}
  ]);

  const toggleFiltersHandler = () => {
    setIsCategoriesOpen(prev => !prev)
  }
  const fetchCourseList = async (pageNumber = 1) => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await getCourseList({pageNumber , rowOfPage: itemsPerPage , sortingCol: sortingCol , sortType: sortType , costDown: courseFilters.costDown , costUp: courseFilters.costUp , teacherId: courseFilters.teacherId , priceType: courseFilters.priceType , query: courseFilters.search,});
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
  }, [courseFilters, sortingCol , sortType]);

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
      setIsMobile(window.innerWidth <= 1000);

      if (window.innerWidth > 1000) {
        setIsFilterOpen(false);
      }
      if (window.innerWidth <= 700) {
        setDisplayMode("regular");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
        {(!isMobile || isFilterOpen) && ( 
          <ProductFilter instructorList={instructorList} courseFilters={courseFilters} setCourseFilters={setCourseFilters} toggleFiltersHandler={toggleFiltersHandler} isCategoriesOpen={isCategoriesOpen} currentPos={currentPos} isMobile={isMobile}/>
        )}
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
              <ViewAsMenu options={sortingOptions} setSortingCol={setSortingCol} setSortType={setSortType} openFilter={() => setIsFilterOpen(prev => !prev)} setCurrentPos={setCurrentPos}/>
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
          <Pagination
            pageCount={pageCount}
            pageIndex={pageIndex}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Courses