import React, { useEffect, useState } from 'react'
import Style from './BookedCourses.module.css'
import ReactPaginate from 'react-paginate'
// import DashBoardCoursesData from '../../../Data/DashBoardCoursesData'
import { Field, Form, Formik } from 'formik'
import useDarkStore from '../../../store/DarkStore'
import { coursePaymentFirst, coursePaymentSecond, userBookedCourse } from '../../../core/services/dashBoardService/dashBoardApi'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'

const BookedCourses = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

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

    const pay = async (reserveId) => {
        try {
            localStorage.setItem("reserveId", reserveId);
            const response = await coursePaymentFirst(reserveId , `${window.location.origin}/Dashboard/Booked`);
            window.open(response.data.link, "_self");
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
        }
    }
    const verifyPayment = async () => {
        try {
            const reserveId = localStorage.getItem("reserveId");

            const response = await coursePaymentSecond(
            reserveId,
            authority
            );

            toast.success(response.data.message);

            localStorage.removeItem("reserveId");

            await fetchBooked();
        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message);
        }
    };
    useEffect(() => {
        if (status === "OK" && authority) {
            verifyPayment();
        }
    }, [status, authority]);

    const GoToCourseDetails = (courseId) => {
        navigate(`/Courses/${courseId}`);
        toast.success("با موفقیت به صفحه دوره منتقل شدید");
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
                                <div className={course?.paymentStatus === "پرداخت نشده" ? Style.waitForPay : Style.itemOpen} onClick={course?.paymentStatus === "پرداخت نشده" ? () => pay(course.reserveId) : undefined}>{course?.paymentStatus === "پرداخت نشده" ? "پرداخت" : "یادگیری"}</div>
                                <div className={Style.viewProduct} onClick={() => {GoToCourseDetails(course?.courseId)}}>
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