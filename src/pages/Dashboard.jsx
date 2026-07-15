import React, { useEffect, useRef, useState } from 'react'
import Style from '../styles/Dashboard.module.css'
import DashBoardMenuItems from '../Data/DashBoardMenuItems'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import userInfoStore from '../store/UserInfoStore'
import useDarkStore from '../store/DarkStore'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from 'react-toastify'

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

    const [selectedItem, setSelectedItem] = useState(DashBoardMenuItems[0].id);
    const user = userInfoStore((state) => state.user);
    const loading = userInfoStore((state) => state.loading);
    const fetchUser = userInfoStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);



    const themeButtonRef = useRef(null);
    const isDarkMode = useDarkStore((state) => state.isDarkMode);
    const toggleDarkMode = useDarkStore((state) => state.toggleDarkMode);

    const handleThemeToggle = async () => {
        const rect = themeButtonRef.current.getBoundingClientRect();

        const themeSwitch_X = rect.left + rect.width / 2;
        const themeSwitch_Y = rect.top + rect.height / 2;

        const endRadius = Math.hypot(
            Math.max(themeSwitch_X, window.innerWidth - themeSwitch_X),
            Math.max(themeSwitch_Y, window.innerHeight - themeSwitch_Y)
        );

        if (!document.startViewTransition) {
            toggleDarkMode();
            return;
        }
        const transition = document.startViewTransition(() => {
            toggleDarkMode();
        });

        await transition.ready;

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${themeSwitch_X}px ${themeSwitch_Y}px)`,
                    `circle(${endRadius}px at ${themeSwitch_X}px ${themeSwitch_Y}px)`,
                ],
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    };

    useEffect(() => {
        if (isDarkMode) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
    }, [isDarkMode])

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
                                    <Link to={item.linkTo} key={item.id} className={selectedItem === item.id  ? Style.activeMenuItem : Style.inactiveMenuItem} onClick={() => {setSelectedItem(item.id);if(window.innerWidth <= 1200){setIsMenuOpen(false);}}} >
                                        <div className={Style.menuItemIconContainer}>
                                            <img src={isDarkMode ? item.imageUrlDarkMode : item.imageUrlLightMode} alt={item.imageAlt} className={Style.menuItemIcon} />
                                        </div>
                                        <span className={Style.menuItemTitle}>{item.title}</span>
                                    </Link>
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
                                <div className={Style.homeButton} onClick={() => navigate("/")} title='برگشت به خانه'>
                                    <img src={isDarkMode ? "/images/homeButton.png" : "/images/homeButtonWhite.png"} alt="Home-Button" className={Style.themeIcon}/>
                                </div>
                                <div className={Style.themeSwitch} ref={themeButtonRef} onClick={handleThemeToggle}  title={isDarkMode ? "حالت روشن" : "حالت تاریک"}>
                                    <motion.img key={isDarkMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} src={isDarkMode ? "/images/lightMode.svg" : "/images/darkMode.svg"} alt={isDarkMode ? "Light Mode" : "Dark Mode"} className={Style.themeIcon}/>
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