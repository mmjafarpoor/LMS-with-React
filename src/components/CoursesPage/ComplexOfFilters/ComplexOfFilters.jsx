import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Style from './ComplexOfFilters.module.css'
import Slider from 'rc-slider';
import RadioTag from "../RadioTag/RadioTag";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import FormLogger from './FormLogger';
import useDarkStore from '../../../store/DarkStore';
import InstructorFilter from '../InstructorFilter/InstructorFilter';

const ComplexOfFilters = ({instructorList , courseFilters ,setCourseFilters}) => {

    // const [sliderValue , setSliderValue] = useState([0,10000000]);
    // console.log(sliderValue);

    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);
    const [isInstructorFilterOpen, setIsInstructorFilterOpen] = useState(true);
    
    const togglePriceFilter = () => {
        setIsPriceFilterOpen(prev => !prev);
    }
    const toggleInstructorFilter = () => {
        setIsInstructorFilterOpen(prev => !prev);
    }

    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    return (
        <Formik
            enableReinitialize
            initialValues={courseFilters}
        >
            {({values, setFieldValue})=> (
                <>
                    <FormLogger setCourseFilters={setCourseFilters}/>
                    <Form className={Style.formClass}>
                        <motion.div className={Style.filterContainer} animate={{height: isPriceFilterOpen ? "auto" : 40}} transition={{duration : 0.5}}>
                            <div className={Style.filterDisplay} onClick={togglePriceFilter}>
                                <span className={Style.filterTitle}>قیمت</span>
                                <img src={isDarkMode ? "/images/displayArrowWhite.png" : "/images/displayArrow.png"} style={{transform: isPriceFilterOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display" className={Style.filterDisplaySwitchIcon}/>
                            </div>
                            <div className={Style.priceRangeSliderContainer}>
                                <Slider key="priceRangeSlider" range reverse min={0} step={100000} max={10000000} value={[values.costDown, values.costUp]} onChange={(value) => {setFieldValue("costDown", value[0]);setFieldValue("costUp", value[1]);setCourseFilters(prev => ({...prev,costDown: value[0],costUp: value[1],}));}}></Slider>
                                <div className={Style.priceRangeSliderValue}>
                                    <p className={Style.priceRangeSliderValueText}>از <span className={Style.priceRangeSliderValueNumber}>{values.costDown.toLocaleString()}</span> تا <span className={Style.priceRangeSliderValueNumber}>{values.costUp.toLocaleString()}</span> تومان</p>
                                </div>
                                <div className={Style.priceRangeSliderFilters}>
                                    {[  {name : "رایگان" , id : "Free" , value : "Free"},
                                        {name : "پولی" , id : "Paid" , value : "Paid"},
                                        {name : "همه" , id : "All" , value : "All"},
                                    ].map((item)=>(
                                        <RadioTag key={item.id} id={item.id} name={item.name} value={item.value}  checkBoxStatus={item.checkBoxStatus}/>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className={Style.filterContainer} animate={{height: isInstructorFilterOpen ? "auto" : 40}} transition={{duration : 0.5}}>
                            <div className={Style.filterDisplay} onClick={toggleInstructorFilter}>
                                <span className={Style.filterTitle}>اساتید</span>
                                <img src={isDarkMode ? "/images/displayArrowWhite.png" : "/images/displayArrow.png"} style={{transform: isInstructorFilterOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Filter-Display" className={Style.filterDisplaySwitchIcon}/>
                            </div>
                            <div className={Style.searchTheInstructors}>
                                <button className={Style.searchIcon} type='submit'>
                                    <img src="/images/search.png" alt="Search-Submit"/>
                                </button>
                                <Field className={Style.searchTheInstructorsInput} type="search" name="searchTheInstructors" autoComplete="off" placeholder="جستجو استاد"></Field>
                            </div>
                            <div className={Style.instructorsFilter}>
                                    {instructorList.map((item)=>(
                                        <InstructorFilter key={item.teacherId} name={item.fullName} id={item.teacherId}/>
                                    ))}
                            </div>
                        </motion.div>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default ComplexOfFilters