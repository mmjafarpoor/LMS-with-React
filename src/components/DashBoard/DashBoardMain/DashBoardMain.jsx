import React, { useState } from 'react'
import Style from './DashBoardMain.module.css'
import UserStats from '../../../Data/UserStats'
import LatestNewsDashBoard from '../../../Data/LatestNewsDashBoard'
import LatestCourseDashBoard from '../../../Data/LatestCoursesDashBoard'
import { Field, Form, Formik } from 'formik'
import Slider from 'rc-slider';
import useDarkStore from '../../../store/DarkStore'
import useUserInfoStore from '../../../store/UserInfoStore'
import GreetingMessage from '../../common/GreetingMessage/GreetingMessage'

const DashBoardMain = () => {

    const [sliderValue, setSliderValue] = useState([0,10000000]);
        console.log(sliderValue);
    
    const isDarkMode = useDarkStore((state) => state.isDarkMode);
    const userName = useUserInfoStore((state) => state.user.userName);

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
                            {LatestNewsDashBoard.map((news) => (
                                <div key={news.id} className={Style.latestNewsItems}>
                                    <span className={Style.newsTitle}>{news.name}</span>
                                    <span className={Style.newsPublishedDate}>{news.date}</span>
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
                        {LatestCourseDashBoard.map((course) => (
                            <div key={course.id} className={Style.latestCourses}>
                                <div className={Style.latestCourseTitle}>{course.title}</div>
                                <div className={Style.latestCourseDescription}>{course.description}</div>
                                <div className={Style.courseInstructors}>{course.instructor}</div>
                                <div className={Style.coursePublishDate}>{course.date}</div>
                                <div className={Style.coursePrice}>{course.price}</div>
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