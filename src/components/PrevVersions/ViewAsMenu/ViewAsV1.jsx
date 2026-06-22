import React, { useState } from 'react'
import Style from './ViewAsMenu.module.css'

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

    return (
        <div className={Style.viewAsMenuContainer} onClick={() => setIsOpen((prev) => !prev)}>
            <div className={Style.listSortIconContainer}>
                <img src="/images/listsort.png" alt="List Sort Icon" className={Style.listSortIcon} />
            </div>
            <div className={Style.sortFilterContainer}>
                <div className={Style.selectedItem}>
                    {selectedItem?.title}
                </div>
                {isOpen && (
                    <div className={Style.dropdown}>
                        {viewAsFilters.map((filter) => (
                            <div key={filter.id} className={Style.option} onClick={() => {setSelectedFilter(filter.id); setIsOpen(false);}}>
                                {filter.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={Style.arrowIconContainer}>
                <img src="/images/displayArrow.png" style={{transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="Arrow Icon" className={Style.arrowIcon}/>
            </div>
        </div>
    )
}

export default ViewAsMenu