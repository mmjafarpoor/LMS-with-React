import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Style from './ComplexOfFilters.module.css'
import Slider from 'rc-slider';
import FilterTag from '../FilterTag/FilterTag';
import { motion } from 'framer-motion';

const ComplexOfFilters = () => {

    const [sliderValue, setSliderValue] = useState([0,10000000]);

    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);
    const [isInstructorFilterOpen, setIsInstructorFilterOpen] = useState(true);
    
    const togglePriceFilter = () => {
        setIsPriceFilterOpen(prev => !prev);
    }
    const toggleInstructorFilter = () => {
        setIsInstructorFilterOpen(prev => !prev);
    }

    return (
        <Formik>
            <Form className={Style.formClass}>
                <motion.div className={Style.filterContainer} animate={{height: isPriceFilterOpen ? "auto" : 40}} transition={{duration : 0.5}}>
                    <div className={Style.filterDisplay} onClick={togglePriceFilter}>
                        <span className={Style.filterTitle}>قیمت</span>
                        <img src="/images/displayArrow.png" style={{transform: isPriceFilterOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display" className={Style.filterDisplaySwitchIcon}/>
                    </div>
                    <div className={Style.priceRangeSliderContainer}>
                        <Slider key="priceRangeSlider" range reverse min={0} step={100000} max={10000000} value={sliderValue} onChange={setSliderValue}></Slider>
                        <div className={Style.priceRangeSliderValue}>
                            <p className={Style.priceRangeSliderValueText}>از <span className={Style.priceRangeSliderValueNumber}>{sliderValue[0].toLocaleString()}</span> تا <span className={Style.priceRangeSliderValueNumber}>{sliderValue[1].toLocaleString()}</span> تومان</p>
                        </div>
                        <div className={Style.priceRangeSliderFilters}>
                            {[  {name : "رایگان" , id : "Free" ,},
                                {name : "پولی" , id : "Paid" ,},
                                {name : "همه" , id : "All" , checkBoxStatus : true },
                            ].map((item)=>(
                                <FilterTag key={item.id} name={item.name} id={item.id} checkBoxStatus={item.checkBoxStatus}/>
                            ))}
                        </div>
                    </div>
                </motion.div>
                <motion.div className={Style.filterContainer} animate={{height: isInstructorFilterOpen ? "auto" : 40}} transition={{duration : 0.5}}>
                    <div className={Style.filterDisplay} onClick={toggleInstructorFilter}>
                        <span className={Style.filterTitle}>اساتید</span>
                        <img src="/images/displayArrow.png" style={{transform: isInstructorFilterOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display" className={Style.filterDisplaySwitchIcon}/>
                    </div>
                    <div className={Style.searchTheInstructors}>
                        <button className={Style.searchIcon} type='submit'>
                            <img src="/images/search.png" alt="Search-Submit"/>
                        </button>
                        <Field className={Style.searchTheInstructorsInput} type="search" name="searchTheInstructors" autoComplete="off" placeholder="جستجو استاد"></Field>
                    </div>
                    <div className={Style.instructorsFilter}>
                            {[  {name : "دکتر بحرالعلوم" , id : "Bahr" ,},
                                {name : "مسعود هشمتی" , id : "Masoud" ,},
                                {name : "طاها رحیمی" , id : "Taha" ,},
                                {name : "محمد رضا سابتی" , id : "MohammadReza" ,},
                            ].map((item)=>(
                                <FilterTag key={item.id} name={item.name} id={item.id} checkBoxStatus={item.checkBoxStatus}/>
                            ))}
                    </div>
                </motion.div>
            </Form>
        </Formik>
    )
}

export default ComplexOfFilters