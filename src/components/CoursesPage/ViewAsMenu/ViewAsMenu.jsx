import React, { useRef, useState } from 'react'
import Style from './ViewAsMenu.module.css'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useDarkStore from '../../../store/DarkStore';

const ViewAsMenu = ({options , setSortingCol , setSortType , openFilter , setCurrentPos}) => {

    const [selectedFilter, setSelectedFilter] = useState(options[0].id);
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);

    const handleSelect = (item, e) => {
        e.stopPropagation();

        setSelectedFilter(item.id);
        setSortingCol(item.sortingCol);
        setSortType(item.sortType);

        setIsOpen(false);
    };

    const selectedItem = options.find(
        (item) => item.id === selectedFilter
    );

    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    const position = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        return {
            top: rect.top + window.scrollY,
            left: rect.left,
            width: rect.width,
            bottom: rect.bottom + window.scrollY,
        };
    }

    return (
        <div className={Style.viewAsMenuContainer} ref={containerRef} onClick={() => {if(window.innerWidth <= 1000){openFilter();setCurrentPos(position());}else{setIsOpen(prev=>!prev);}}}>
            <span className={Style.mobileMenuTitle}>ترتیب و فیلتر</span>
            <div className={Style.listSortIconContainer}>
                <img src={isDarkMode ? "/images/listsortWhite.png" : "/images/listsort.png"} alt="List Sort Icon" className={Style.listSortIcon} />
            </div>
            <div className={Style.sortFilterContainer}>
                <div className={Style.selectedItem}>
                    {selectedItem?.title}
                </div>
                    <motion.div 
                        className={Style.dropdown} 
                        animate={isOpen ? "open" : "closed"} 
                        variants={{open: {height: "auto",opacity: 1}, 
                        closed: {height: 0,opacity: 0}}} 
                        transition={{ duration: 0.35 }}
                    >
                        {options.filter((filter) => filter.id !== selectedFilter)
                        .map((filter) => (
                            <div key={filter.id} className={Style.option} 
                                onClick={(e) => {handleSelect(filter, e)}}>
                                {filter?.title}
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