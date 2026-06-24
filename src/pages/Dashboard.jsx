import React, { useState } from 'react'
import Style from '../styles/Dashboard.module.css'
import DashBoardMenuItems from '../Data/DashBoardMenuItems'
import { Link, Outlet } from 'react-router-dom'

const DashBoard = () => {

    const [selectedItem, setSelectedItem] = useState(DashBoardMenuItems[0].id);

    return (
        <div className={Style.dashboard}>
            <div className={Style.dashboardHolder}>
                <div className={Style.dashboardMenuContainer}>
                    <div className={Style.dashboardMenu}>
                        <div className={Style.dashboardMenuTop}>
                            <div className={Style.logoContainer}>
                                <img src="/images/midSizedLogo.svg" alt="Logo" className="logo" />
                                <img src="/images/logoWordMark.png" alt="Logo-WordMark" className="logoWordMark" />
                            </div>
                            <div className={Style.menuItemsContainer}>
                                {DashBoardMenuItems.map((item) =>(
                                    <Link to={item.linkTo} key={item.id} className={selectedItem === item.id  ? Style.activeMenuItem : Style.inactiveMenuItem} onClick={() => setSelectedItem(item.id)} >
                                        <div className={Style.menuItemIconContainer}>
                                            <img src={item.imageUrlLightMode} alt={item.imageAlt} className={Style.menuItemIcon} />
                                        </div>
                                        <span className={Style.menuItemTitle}>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={Style.dashboardMenuBottom}>
                            <button className={Style.logOutButton}>
                                <img src="/images/logOut.svg" alt="log-out-icon" className={Style.logOutIcon} />
                                <span className={Style.logOutText}>خروج از حساب</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={Style.dashboardMain}>
                    <div className={Style.dashboardHeaderContainer}>
                        <div className={Style.dashboardHeader}>
                            <div className={Style.userInfoBox}>
                                <div className={Style.userProfileContainer}>
                                    <img src="/images/profile.png" alt="user-profile" className={Style.userProfile}/>
                                </div>
                                <div className={Style.userNameContainer}>
                                    <div className={Style.userName}>
                                        <span className={Style.userNameText}>امیر محمد</span>
                                    </div>
                                    <span className={Style.userId}>
                                        <span className={Style.userIdText}>amirKh@</span>
                                    </span>
                                </div>
                            </div>
                            <div className={Style.themeSwitch}>
                                <img src="/public/images/darkMode.png" alt="Theme Icon" className={Style.themeIcon}/>
                            </div>
                        </div>
                    </div>
                    <main className={Style.outLet}>
                        <Outlet></Outlet>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default DashBoard