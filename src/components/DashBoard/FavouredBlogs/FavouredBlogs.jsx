import React, { useCallback, useEffect, useState } from 'react'
import Style from './FavouredBlogs.module.css'
import DashBoardCoursesData from '../../../Data/DashBoardCoursesData'
import ReactPaginate from 'react-paginate'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getFavoriteNews } from '../../../core/services/newsService/newsService'

const FavouredBlogs = () => {
    const navigate = useNavigate();

    const [favouredList, setFavouredList] = useState([]);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 8;

    const fetchFavoriteBlogs = useCallback(async() => {
        try {
            const response = await getFavoriteNews();
            console.log(response);
            console.log(response.data);
            
            if(response.data?.myFavoriteNews){
                setFavouredList(response.data?.myFavoriteNews);
                setPageCount(Math.ceil(response.data.length / itemsPerPage));
                console.log("Data Received",response.data.myFavoriteNews);
            }
        } catch (error) {
            console.log(error.response?.data);
            toast.error("در نمایش مقالات مورد علاقه شما خطایی رخ داد");
        }
    },[]);

    useEffect(() => {
        fetchFavoriteBlogs();
    }, [fetchFavoriteBlogs]);
    
            
    const handlePageClick = async (event) => {
        const page = event.selected + 1;

        setPageIndex(event.selected);

        // await fetchCourseList(page);
    };

    return (
        <Formik>
            <Form className={Style.bookedCoursesContainer}>
                <div className={Style.pageTitle}>مقاله های مورد علاقه من</div>
                <div className={Style.mainContainer}>
                    <div className={Style.itemsInputContainer}>
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
                    </div>
                    <div className={Style.itemsContainer}>
                        {DashBoardCoursesData.map((course) => (
                            <div key={course.id} className={Style.item}>
                                <div className={Style.itemImageContainer}>
                                    <img src={course.imageURL} alt="Item-Image" className={Style.itemImage}/>
                                </div>
                                <div className={Style.itemTitle}>{course.title}</div>
                                <div className={Style.itemDescription}>{course.instructor}</div>
                                <div className={Style.itemPrice}>{course.date}</div>
                                <div className={Style.itemAction}>
                                    <div className={Style.viewProduct}>
                                        <img src="/images/viewProductWithOutBorder.svg" alt="Product-View-Icon" className={Style.viewProductIcon}/>
                                    </div>
                                    <div className={Style.deleteProduct}>
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