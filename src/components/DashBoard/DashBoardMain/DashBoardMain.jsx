import React, { useEffect, useState } from 'react'
import Style from './DashBoardMain.module.css'
import UserStats from '../../../Data/UserStats'
import LatestNewsDashBoard from '../../../Data/LatestNewsDashBoard'
import LatestCourseDashBoard from '../../../Data/LatestCoursesDashBoard'
import { Field, Form, Formik } from 'formik'
import Slider from 'rc-slider';
import useDarkStore from '../../../store/DarkStore'
import useUserInfoStore from '../../../store/UserInfoStore'
import GreetingMessage from '../../common/GreetingMessage/GreetingMessage'
import { toast } from 'react-toastify'
import { getCourseList } from '../../../core/services/get'
import { formatPricePersian } from '../../../utils/formatPrice'
import { toShamsiDate , toShamsiDateTime } from "../../../utils/dateFormatter";
import apiClient from '../../../core/interceptor/interceptor'

const DashBoardMain = () => {
    const isDarkMode = useDarkStore((state) => state.isDarkMode);
    const userName = useUserInfoStore((state) => state.user.userName);

    const [sliderValue, setSliderValue] = useState([0,10000000]);
        console.log(sliderValue);

    const [courseList, setCourseList] = useState([]);
    const [newsList, setNewsList] = useState([]);

    const fetchCourseList = async (pageNumber = 1) => {
        try{
            const response = await getCourseList({pageNumber, rowOfPage: 6,});
            if (response.data?.courseFilterDtos) {
                setCourseList(response.data.courseFilterDtos);
                console.log("Data Received",response.data.courseFilterDtos)}
            }
        catch (err) {
            console.error("Fetch error:", err);
            const errorMsg = err.message || "خطا در بارگذاری لیست دوره‌ها";
            toast.error(errorMsg);
        }
    }
    const fetchNewsList = async () => {
        try {
            const response = await apiClient("/News",{PageNumber : 1, RowsOfPage: 6,});
            if (response.data?.news) {
                setNewsList(response.data.news);
                console.log("Data Received",response.data.news)
            }
        }
        catch (error) {
            console.error("Fetch error:", error);
            const errorMsg = error.message || "خطا در بارگذاری لیست دوره‌ها";
            toast.error(errorMsg);
        }
    }
    useEffect(() => {
        fetchNewsList();
        fetchCourseList(1);
    }, [])

    return (
        <Formik>
            <Form className={Style.dashBoardMainContainer}>
                <div className={Style.userStatsContainer}>
                    <div className={Style.greetingMessage}>سلام، {GreetingMessage}<br/>{userName}</div>
                    {UserStats.map((stat) => (
                        <div key={stat.id} className={Style.userStats}>
                            <div className={Style.statIconContainer}>
                                <img src={isDarkMode ? stat.imageUrlDarkMode : stat.imageUrlLightMode} alt={stat.imageUlt} className={Style.statIcon}/>
                            </div>
                            <div className={Style.statTextContainer}>
                                <div className={Style.statTitle}>{stat.name}</div>
                                <div className={Style.statCount}>{stat.stat}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={Style.latestNewsContainer}>
                    <div className={Style.latestNews}>
                        <div className={Style.latestNewsTitle}>جدید ترین اخبار و مقالات</div>
                        <div className={Style.latestNewsItemsContainer}>
                            {newsList.map((news) => (
                                <div key={news.id} className={Style.latestNewsItems}>
                                    <span className={Style.newsTitle}>{news.describe}</span>
                                    <span className={Style.newsPublishedDate}>{toShamsiDateTime(news.insertDate)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={Style.profileProgress}>
                        <span className={Style.profileProgressStatus}>پروفایل تکمیل شده</span>
                        <div className={Style.circularProgressBarContainer}>
                            <img src="/images/progressBar.svg" alt="Progress Bar" className={Style.progressBarImg} />
                        </div>
                    </div>
                </div>
                <div className={Style.latestCoursesContainer}>
                    <div className={Style.latestCoursesTitle}>جدید ترین دوره ها</div>
                    <div className={Style.latestCoursesInputs}>
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
                    </div>
                    <div className={Style.latestCoursesItemContainer}>
                        {courseList.map((course) => (
                            <div key={course.id} className={Style.latestCourses}>
                                <div className={Style.latestCourseTitle}>{course.title}</div>
                                <div className={Style.latestCourseDescription}>{course.describe}</div>
                                <div className={Style.courseInstructors}>{course.teacherName}</div>
                                <div className={Style.coursePublishDate}>{toShamsiDate(course.lastUpdate)}</div>
                                <div className={Style.coursePrice}>{formatPricePersian(course.cost)}</div>
                                <div className={Style.viewCourse}>
                                    <img src={isDarkMode ? "/images/viewProductDark.svg" :"/images/viewProduct.svg"} alt="View-Course-Icon" className={Style.viewCourseIcon}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default DashBoardMain