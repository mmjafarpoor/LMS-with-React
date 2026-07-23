import React, { useEffect, useState } from 'react'
import Style from './Reserved.module.css'
import ReactPaginate from 'react-paginate'
import { Field, Form, Formik } from 'formik'
import Slider from 'rc-slider';
import { coursePaymentFirst, coursePaymentSecond, deleteReserveCourse, userReserveCourse } from '../../../core/services/dashBoardService/dashBoardApi'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Reserved = () => {

    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    // const [sliderValue, setSliderValue] = useState([0,10000000]);
    //         console.log(sliderValue);
    const perPage = 6;

    const [reserved, setReserved] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const startIndex = pageIndex * perPage;
    const currentItems = reserved.slice(startIndex, startIndex + perPage);

    const getReservedCourses = async () => {
        try {
            const response = await userReserveCourse();
            console.log("Reserved =",response.data)
            setReserved(response.data);
            setPageCount(Math.ceil(response.data.length / perPage));
        } catch (error) {
            console.log(error);
            toast.error("در بارگذاری رزرو شده‌ها خطایی رخ داد");
        }
    }
    useEffect(() => {
        getReservedCourses();
    }, [])
    
    
    const handlePageClick = async (event) => {
        setPageIndex(event.selected);

        // await fetchCourseList(page);
    };

    const pay = async (reserveId) => {
        try {
            localStorage.setItem("reserveId", reserveId);
            const response = await coursePaymentFirst(reserveId , `${window.location.origin}/Dashboard/Reserved`);
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

            await getReservedCourses();
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

    const deleteReserve = async(id) => {
        try {
            await deleteReserveCourse(id);
            toast.success("رزرو شما با موفقیت حذف شد");
            await getReservedCourses();
        } catch (error) {
            console.log(error);
            toast.error("در حذف رزرو شما خطایی رخ داد");
        }
    }

    const GoToCourseDetails = (courseId) => {
        const courseDetail = toast.loading("در حال انتقال به صفحه دوره انتخاب شده...");

        try {
            navigate(`/Courses/${courseId}`);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "با موفقیت به صفحه دوره انتخاب شده منتقل شدید",
                    type: "success",
                    isLoading: false,
                    autoClose: 1100,
                });
            },500);
        } catch (error) {
            console.log(error.response?.data);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "در انتقال به صفحه دوره انتخاب شده خطایی رخ داد",
                    type: "error",
                    isLoading: false,
                    autoClose: 1100,
                });
            },500);
        }
    };

    return (
        <Formik>
            <Form className={Style.bookedCoursesContainer}>
                <div className={Style.pageTitle}>رزرو های من</div>
                <div className={Style.mainContainer}>
                    {/* <div className={Style.itemsInputContainer}>
                        <div className={Style.formStyle}>
                            <div className={Style.searchFilter}>
                                <button className={Style.searchSubmit} type='submit'>
                                    <img src="/images/search.png" alt="Filter" className={Style.filterIcon}/>
                                </button>
                                <Field className={Style.searchInput} type="search" name="searchTheCourses" autoComplete="off" placeholder="جستجوی دوره"></Field>
                            </div>
                            <div className={Style.searchFilter}>
                                <button className={Style.searchSubmit} type='submit'>
                                    <img src="/images/search.png" alt="Filter" className={Style.filterIcon}/>
                                </button>
                                <Field className={Style.searchInput} type="search" name="searchTheInstructors" autoComplete="off" placeholder="جستجوی اساتید"></Field>
                            </div>
                            <div className={Style.priceRangeSliderContainer}>
                                <Slider key="priceRangeSlider" range reverse min={0} step={100000} max={10000000} value={sliderValue} onChange={setSliderValue}></Slider>
                                <div className={Style.priceRangeSliderValue}>
                                    <p className={Style.priceRangeSliderValueText}>از <span className={Style.priceRangeSliderValueNumber}>{sliderValue[0].toLocaleString()}</span> تا <span className={Style.priceRangeSliderValueNumber}>{sliderValue[1].toLocaleString()}</span> تومان</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className={Style.itemsContainer}>
                        {currentItems.map((course) => (
                            <div key={course.courseId} className={Style.item}>
                                <div className={Style.itemImageContainer}>
                                    <img src={course.image || "/images/javaScriptProductCard.png"} onError={(e) => {e.target.src = "/images/javaScriptProductCard.png";}} alt="Item-Image" className={Style.itemImage}/>
                                </div>
                                <div className={Style.itemTitle}>{course.courseName || "اسم دوره"}</div>
                                <div className={Style.itemDescription}>{course.teacher || "نام استاد"}</div>
                                {/* <div className={Style.itemPrice}>{course.price}</div> */}
                                {course?.accept == true ?
                                    <div className={Style.itemOpen} onClick={() => {pay(course?.reserveId)}}>انتظار پرداخت</div> :
                                    <div className={Style.itemOpen}> انتظار تایید</div>
                                }
                                <div className={Style.itemAction}>
                                    <div className={Style.viewProduct} onClick={() => {GoToCourseDetails(course?.courseId)}}>
                                        <img src="/images/viewProductWithOutBorder.svg" alt="Product-View-Icon" className={Style.viewProductIcon}/>
                                    </div>
                                    <div className={Style.deleteProduct} onClick={() => {deleteReserve(course.reserveId)}}>
                                        <img src="/images/cancelProduct.svg" alt="Delete-Product-Icon" className={Style.viewProductIcon}/>
                                    </div>
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

export default Reserved