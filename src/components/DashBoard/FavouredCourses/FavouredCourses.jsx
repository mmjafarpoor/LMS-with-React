import React, { useCallback, useEffect, useState } from 'react'
import Style from './FavouredCourses.module.css'
import ReactPaginate from 'react-paginate'
import { Field, Form, Formik } from 'formik'
import Slider from 'rc-slider';
import { deleteFavoriteCourse, getFavoriteCourse } from '../../../core/services/dashBoardService/dashBoardApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FavouredCourses = () => {
    const navigate = useNavigate();

    // const [sliderValue, setSliderValue] = useState([0,10000000]);
    //         console.log(sliderValue);

    const [favouredList, setFavouredList] = useState([]);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 7;

    const startIndex = pageIndex * itemsPerPage;
    const currentItems = favouredList.slice(startIndex, startIndex + itemsPerPage);

    const fetchFavoriteCourses = useCallback(async() => {
        try {
            const response = await getFavoriteCourse();
            console.log(response);
            console.log(response.data);
            if (response.data?.favoriteCourseDto) {
                setFavouredList(response.data.favoriteCourseDto);
                setPageCount(Math.ceil(response.data.favoriteCourseDto.length / itemsPerPage));
                console.log("Favoured Courses =",response.data.favoriteCourseDto);
            }
        } catch (error) {
            console.log(error.response?.data);
            toast.error("در نمایش دوره های مورد علاقه شما خطایی رخ داد")
        }
    },[])

    const GoToCourseDetails = (courseId) => {
        const courseDetail = toast.loading("در حال انتقال به صفحه دوره انتخاب شده...");

        try {
            navigate(`/Courses/${courseId}`);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "با موفقیت به صفحه دوره انتخاب شده منتقل شدید",
                    type: "success",
                    isLoading: false,
                    autoClose: 800,
                });
            },500);
        } catch (error) {
            console.log(error.response?.data);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "در انتقال به صفحه دوره انتخاب شده خطایی رخ داد",
                    type: "error",
                    isLoading: false,
                    autoClose: 800,
                });
            },500);
        }
    };

    const deleteFavorite = async(id) => {
        const deleteToast = toast.loading("در حال حذف دوره انتخاب شده...");

        try {
            await deleteFavoriteCourse(id);
            await fetchFavoriteCourses();

            setTimeout(()=>{
                toast.update(deleteToast, {
                    render: "دوره از علاقه مندی ها حذف شد",
                    type: "success",
                    isLoading: false,
                    autoClose: 800,
                });
            },500)

        } catch (error) {
            console.log(error.response?.data);
            setTimeout(()=>{
                toast.update(deleteToast, {
                    render: "در حذف دوره از علاقه مندی ها خطایی رخ داد",
                    type: "error",
                    isLoading: false,
                    autoClose: 800,
                });
            },500);
        }
    }
        
    useEffect(() => {
        fetchFavoriteCourses();
    }, [fetchFavoriteCourses])
    

    const handlePageClick = async (event) => {
        setPageIndex(event.selected);

        // await fetchCourseList(page);
    };

    return (
        <Formik>
            <Form className={Style.bookedCoursesContainer}>
                <div className={Style.pageTitle}>دوره های مورد علاقه من</div>
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
                            <div key={course.id} className={Style.item}>
                                <div className={Style.itemImageContainer}>
                                    <img src={course.imageAddress || "/images/javaScriptProductCard.png"} onError={(e) => {e.target.src = "/images/javaScriptProductCard.png";}} alt="Item-Image" className={Style.itemImage}/>
                                </div>
                                <div className={Style.itemTitle}>{course.course?.title || "عنوان دوره"}</div>
                                <div className={Style.itemDescription}>{course.teacheName || "اسم مدرس"}</div>
                                <div className={Style.itemPrice}>{course.cost.toLocaleString()} تومان</div>
                                <div className={Style.itemOpen}>شروع یادگیری</div>
                                <div className={Style.itemAction}>
                                    <div className={Style.viewProduct} onClick={() => GoToCourseDetails(course.courseId)}>
                                        <img src="/images/viewProductWithOutBorder.svg" alt="Product-View-Icon" className={Style.viewProductIcon}/>
                                    </div>
                                    <div className={Style.deleteProduct} onClick={() => deleteFavorite(course.id)}>
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

export default FavouredCourses