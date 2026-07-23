import React, { useEffect, useState } from 'react'
import Style from './BookedCourses.module.css'
import ReactPaginate from 'react-paginate'
// import DashBoardCoursesData from '../../../Data/DashBoardCoursesData'
import { Field, Form, Formik } from 'formik'
import useDarkStore from '../../../store/DarkStore'
import { userBookedCourse } from '../../../core/services/dashBoardService/dashBoardApi'

const BookedCourses = () => {

    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    const [search, setSearch] = useState("");

    const [booked, setBooked] = useState([]);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const rowsOfPage = 6;

    const fetchBooked = async (page = 1 , searchValue = search) => {
        try {
            const response = await userBookedCourse(page,rowsOfPage,"DESC","LastUpdate",searchValue);
            console.log("Booked Courses =",response.data);
            setBooked(response.data.listOfMyCourses);
            setPageCount(Math.ceil(response.data.totalCount / rowsOfPage));
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
        }
    }
    useEffect(() => {
        fetchBooked(1);
    }, [])
    

    const handlePageClick = async (event) => {
        const page = event.selected + 1;

        setPageIndex(event.selected);

        await fetchBooked(page, search);
    };

    return (
        <Formik
            initialValues={{
                searchTheCourses: "",
            }}
            onSubmit={(values) => {
                setSearch(values.searchTheCourses);
                setPageIndex(0);
                fetchBooked(1, values.searchTheCourses);
            }}
        >
            <Form className={Style.bookedCoursesContainer}>
                <div className={Style.pageTitle}>دوره های من</div>
                <div className={Style.mainContainer}>
                    <div className={Style.itemsInputContainer}>
                        <div className={Style.formStyle}>
                            <div className={Style.searchFilter}>
                                <button className={Style.searchSubmit} type='submit'>
                                    <img src="/images/search.png" alt="Filter" className={Style.filterIcon}/>
                                </button>
                                <Field className={Style.searchInput} type="search" name="searchTheCourses" autoComplete="off" placeholder="جستجوی دوره"></Field>
                            </div>
                            {/* <div className={Style.searchFilter}>
                                <button className={Style.searchSubmit} type='submit'>
                                    <img src="/images/search.png" alt="Filter" className={Style.filterIcon}/>
                                </button>
                                <Field className={Style.searchInput} type="search" name="searchTheInstructors" autoComplete="off" placeholder="جستجوی اساتید"></Field>
                            </div> */}
                        </div>
                    </div>
                    <div className={Style.itemsContainer}>
                        {booked.map((course) => (
                            <div key={course.id} className={Style.item}>
                                <div className={Style.itemImageContainer}>
                                    <img src={course?.course?.imageAddress || "/images/javaScriptProductCard.png"} onError={(e) => {e.target.src = "/images/javaScriptProductCard.png";}} alt="Item-Image" className={Style.itemImage}/>
                                </div>
                                <div className={Style.itemTitle}>{course?.course?.title || "عنوان دوره"}</div>
                                <div className={Style.itemDescription}>{course?.course?.describe || "شرح دوره"}</div>
                                <div className={Style.itemInstructors}>{course?.course?.teacher?.fName} {course?.course?.teacher?.lName}</div>
                                <div className={Style.itemOpen}>{course?.paymentStatus}</div>
                                <div className={Style.viewProduct}>
                                    <img src={isDarkMode ? "/images/viewProductDark.svg" :"/images/viewProduct.svg"} alt="Product-View-Icon" className={Style.viewProductIcon}/>
                                </div>
                            </div>
                        ))}
                    </div>
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
            </Form>
        </Formik>
    )
}

export default BookedCourses