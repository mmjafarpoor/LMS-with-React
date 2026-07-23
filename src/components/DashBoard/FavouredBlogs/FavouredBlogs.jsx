import React, { useCallback, useEffect, useState } from 'react'
import Style from './FavouredBlogs.module.css'
import ReactPaginate from 'react-paginate'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteFavoriteNews, getFavoriteNews } from '../../../core/services/newsService/newsService'
import { toShamsiDate } from '../../../utils/dateFormatter'

const FavouredBlogs = () => {
    const navigate = useNavigate();

    const [favouredList, setFavouredList] = useState([]);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 8;

    const startIndex = pageIndex * itemsPerPage;
    const currentItems = favouredList.slice(startIndex, startIndex + itemsPerPage);

    const fetchFavoriteBlogs = useCallback(async() => {
        try {
            const response = await getFavoriteNews();
            console.log(response);
            console.log(response.data);
            
            if(response.data?.myFavoriteNews){
                setFavouredList(response.data?.myFavoriteNews);
                setPageCount(Math.ceil(response.data?.myFavoriteNews?.length / itemsPerPage));
                console.log("Favoured Blogs =",response.data.myFavoriteNews);
            }
        } catch (error) {
            console.log(error.response?.data);
            toast.error("در نمایش مقالات مورد علاقه شما خطایی رخ داد");
        }
    },[]);

    const GoToNewsDetails = (newsId , googleTitle) => {
        const courseDetail = toast.loading("در حال انتقال به مقاله انتخاب شده...");

        try {
            navigate(`/News/${newsId}/${googleTitle.replaceAll(" ", "-")}`);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "با موفقیت به مقاله انتخاب شده منتقل شدید",
                    type: "success",
                    isLoading: false,
                    autoClose: 800,
                });
            },500);
        } catch (error) {
            console.log(error.response?.data);
            setTimeout(()=>{
                toast.update(courseDetail, {
                    render: "در انتقال به مقاله انتخاب شده خطایی رخ داد",
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
            await deleteFavoriteNews(id);
            await fetchFavoriteBlogs();

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
    };

    useEffect(() => {
        fetchFavoriteBlogs();
    }, [fetchFavoriteBlogs]);

    const handlePageClick = async (event) => {
        // const page = event.selected + 1;

        setPageIndex(event.selected);

        // await fetchCourseList(page);
    };

    return (
        <Formik>
            <Form className={Style.bookedCoursesContainer}>
                <div className={Style.pageTitle}>مقاله های مورد علاقه من</div>
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
                        </div>
                    </div> */}
                    <div className={Style.itemsContainer}>
                        {currentItems.map((course) => (
                            <div key={course.id} className={Style.item}>
                                <div className={Style.itemImageContainer}>
                                    <img src={course.currentImageAddressTumb || "/images/PythonBig.png"} onError={(e) => {e.target.src = "/images/PythonBig.png";}} alt="Item-Image" className={Style.itemImage}/>
                                </div>
                                <div className={Style.itemTitle}>{course.title}</div>
                                <div className={Style.itemDescription}>{course.auther || "اسم ناشر"}</div>
                                <div className={Style.itemPrice}>{toShamsiDate(course.news.insertDate) || "تاریخ انتشار"}</div>
                                <div className={Style.itemAction}>
                                    <div className={Style.viewProduct} onClick={() => GoToNewsDetails(course.newsId , course.news.googleTitle)}>
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

export default FavouredBlogs