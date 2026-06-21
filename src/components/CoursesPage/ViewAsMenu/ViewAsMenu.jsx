import React from 'react'
import Style from './ViewAsMenu.module.css'

const ViewAsMenu = () => {
    return (
        <div className={Style.viewAsMenuContainer}>
            <div className={Style.listSortIconContainer}>
                <img src="/images/listsort.png" alt="List Sort Icon" className={Style.listSortIcon} />
            </div>
            <div className={Style.sortFilterContainer}>
                <div className={Style.selectedSort}></div>
            </div>
            <div className={Style.arrowIconContainer}>
                <img src="/images/displayArrow.png" alt="Arrow Icon" className={Style.arrowIcon}/>
            </div>
        </div>
    )
}

export default ViewAsMenu