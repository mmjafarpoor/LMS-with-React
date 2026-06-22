import React, { useState } from 'react'
import Style from './ViewAsMenu.module.css'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useDarkStore from '../../../store/DarkStore';

const ViewAsMenu = () => {

    const [selectedFilter, setSelectedFilter] = useState('favored');
    const [isOpen, setIsOpen] = useState(false);

    const viewAsFilters = [
        {title: "محبوب ترین ها" , id : "favored"},
        {title: "ارزان ترین" , id : "cheapest"},
        {title: "گران ترین" , id : "mostExpensive"},
        {title: "جدید ترین" , id : "newest"},
    ]
    const selectedItem = viewAsFilters.find(
        (item) => item.id === selectedFilter
    );

    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    return (
        <div className={Style.viewAsMenuContainer} onClick={() => setIsOpen((prev) => !prev)}>
            <div className={Style.listSortIconContainer}>
                <img src={isDarkMode ? "/images/listsortWhite.png" : "/images/listsort.png"} alt="List Sort Icon" className={Style.listSortIcon} />
            </div>
            <div className={Style.sortFilterContainer}>
                <div className={Style.selectedItem}>
                    {selectedItem?.title}
                </div>
                    <motion.div className={Style.dropdown} animate={isOpen ? "open" : "closed"} variants={{open: {height: "auto",opacity: 1}, closed: {height: 0,opacity: 0}}} transition={{ duration: 0.35 }}>
                        {viewAsFilters.filter((filter) => filter.id !== selectedFilter)
                        .map((filter) => (
                            <div key={filter.id} className={Style.option} onClick={() => {setSelectedFilter(filter.id); setIsOpen(true);}}>
                                {filter.title}
                            </div>
                        ))}
                    </motion.div>
            </div>
            <div className={Style.arrowIconContainer}>
                <img src={isDarkMode ? "/images/displayArrowWhite.png" : "/images/displayArrow.png"} style={{transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Arrow Icon" className={Style.arrowIcon}/>
            </div>
        </div>
    )
}

export default ViewAsMenu