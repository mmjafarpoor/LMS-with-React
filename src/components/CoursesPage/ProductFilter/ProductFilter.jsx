import React from 'react'
import Style from './ProductFilter.module.css'
import { motion } from 'framer-motion'
import useDarkStore from '../../../store/DarkStore';
import SearchFilterInput from '../SearchTheFilter/SearchFilterInput';
import ComplexOfFilters from "../ComplexOfFilters/ComplexOfFilters"

const ProductFilter = ({instructorList , courseFilters , setCourseFilters , toggleFiltersHandler , isCategoriesOpen , currentPos , isMobile}) => {

    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    console.log(currentPos);
    
    return (
        <div className={Style.productFilterContainer} style={isMobile ? {top: `${currentPos?.bottom + 30}px`,} : undefined }>
            <div className={Style.searchTheFilters}>
            <SearchFilterInput/>
            </div>
            <motion.div className={Style.filtersContainer}  
                animate={{height: isCategoriesOpen ? "auto" : 40}} 
                transition={{duration : 0.7}}
            >
            <div className={Style.filtersDisplaySwitch} onClick={toggleFiltersHandler}>
                <span className={Style.filterTitle}>دسته بندی ها</span>
                <img src={isDarkMode ? "/images/displayArrowWhite.png" : "/images/displayArrow.png"} 
                    style={{transform: isCategoriesOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} 
                    alt="Filter-Display-Switch" className={Style.filterDisplaySwitchIcon}
                />
            </div>
            <ComplexOfFilters 
                instructorList={instructorList} 
                courseFilters={courseFilters} 
                setCourseFilters={setCourseFilters}
            />
            <div className={Style.showMoreFilters}>
                <span className={Style.showMoreFiltersText}>مشاهده‌ بیشتر</span>
            </div>
            </motion.div>
        </div>
    )
}

export default ProductFilter