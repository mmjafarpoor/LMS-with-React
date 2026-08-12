import React, { useEffect, useRef, useState } from 'react'
import Style from '../styles/Dashboard.module.css'
import DashBoardMenuItems from '../Data/DashBoardMenuItems'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import userInfoStore from '../store/UserInfoStore'
import useDarkStore from '../store/DarkStore'
import { toast } from 'react-toastify'
import { themeAnimation } from '@/ui/animations/themeAnimation'

const DashBoard = () => {

    const navigate = useNavigate();

    const handleLogOut = () =>{
        const toastId = toast.loading("در حال خروج از حساب...");

        localStorage.removeItem("token");
        setTimeout(()=>{
            toast.update(toastId, {
                render: "با موفقیت خارج شدید",
                type: "success",
                isLoading: false,
                autoClose: 1200,
            });
            navigate("/Auth", { replace: true });
        },1700)
    }

    // const [selectedItem, setSelectedItem] = useState(DashBoardMenuItems[0].id);
    const user = userInfoStore((state) => state.user);
    // const loading = userInfoStore((state) => state.loading);
    const fetchUser = userInfoStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const themeButtonRef = useRef(null);
    const isDarkMode = useDarkStore((state) => state.isDarkMode);
    const toggleDarkMode = useDarkStore((state) => state.toggleDarkMode);

    const handleThemeToggle = () => {
        themeAnimation({ themeButtonRef , toggleDarkMode });
    };

    // const updateUser = useUserInfoStore((state) => state.updateUser);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={Style.dashboard}>
            <div className={Style.dashboardHolder}>
                <div  className={`${Style.dashboardMenuContainer} ${isMenuOpen ? Style.menuOpen : ""}`}>
                    <div className={Style.dashboardMenu}>
                        <div className={Style.dashboardMenuTop}>
                            <div className={Style.logoContainer}>
                                <img src="/images/midSizedLogo.svg" alt="Logo" className="logo" />
                                <img src="/images/logoWordMark.png" alt="Logo-WordMark" className="logoWordMark" />
                            </div>
                            <div className={Style.menuItemsContainer}>
                                {DashBoardMenuItems.map((item) =>(
                                    <NavLink to={item.linkTo} key={item.id} className={({ isActive }) => isActive ? Style.activeMenuItem : Style.inactiveMenuItem} onClick={() => {if(window.innerWidth <= 1200){setIsMenuOpen(false);}}} >
                                        <div className={Style.menuItemIconContainer}>
                                            <img src={isDarkMode ? item.imageUrlDarkMode : item.imageUrlLightMode} alt={item.imageAlt} className={Style.menuItemIcon} />
                                        </div>
                                        <span className={Style.menuItemTitle}>{item.title}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <div className={Style.dashboardMenuBottom}>
                            <button className={Style.logOutButton} onClick={handleLogOut}>
                                <img src="/images/logOut.svg" alt="log-out-icon" className={Style.logOutIcon} />
                                <span className={Style.logOutText}>خروج از حساب</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={Style.dashboardMain}>
                    <div className={Style.dashboardHeaderContainer}>
                        <div className={Style.dashboardHeader}>
                            <div className={Style.mobileMenuSwitch} onClick={() => setIsMenuOpen(prev => !prev)}>
                                <img src={isDarkMode ? "/images/mobileMenuOpenDarkMode.svg" : "/images/mobileMenuOpenLightMode.svg"} alt="Mobile-Menu" className={Style.mobileMenuIcon} />
                            </div>
                            <div className={Style.userInfoBox}>
                                <div className={Style.userProfileContainer}>
                                    <img src={user?.userProfilePicture} alt="user-profile" className={Style.userProfile}/>
                                </div>
                                <div className={Style.userNameContainer}>
                                    <div className={Style.userName}>
                                        <span className={Style.userNameText}>{user?.userName}</span>
                                    </div>
                                    <span className={Style.userId}>
                                        <span className={Style.userIdText}>userId@</span>
                                    </span>
                                </div>
                            </div>
                            <div className={Style.headerAccessBar}>
                                <div className={Style.homeButton} onClick={() => navigate("/Home")} title='برگشت به خانه'>
                                    <img src={isDarkMode ? "/images/homeButton.png" : "/images/homeButtonWhite.png"} alt="Home-Button" className={Style.themeIcon}/>
                                </div>
                                <div className={Style.themeSwitch} ref={themeButtonRef} onClick={handleThemeToggle}  title={isDarkMode ? "حالت روشن" : "حالت تاریک"}>
                                    <img src={isDarkMode ? "/images/lightMode.svg" : "/images/darkMode.svg"} alt={isDarkMode ? "Light Mode" : "Dark Mode"} className={Style.themeIcon}/>
                                </div>
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