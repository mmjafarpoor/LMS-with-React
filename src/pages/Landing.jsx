import React, { useEffect, useState, useRef } from "react";
import Style from "../styles/Landing.module.css";
import clsx from "clsx";
import { NavLink, Outlet , useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useDarkStore from "../store/DarkStore";
import userInfoStore from "../store/UserInfoStore";
import { toast } from "react-toastify";
import MenuItems from '../Data/MenuItems'
import BottomMenu from "../Data/BottomMenu";

const Landing = () => {
    const navigate = useNavigate();
    const user = userInfoStore((state) => state.user);
    const fetchUser = userInfoStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const token = localStorage.getItem("token");

	const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderFixed(window.scrollY > 180);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
	
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
    

    const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log("Menu Status =", isMenuOpen);
    };
    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 700 && isMenuOpen) {
        setIsMenuOpen(false);
        }
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, [isMenuOpen]);

    const GoToAuth = () => {
        const directingToast = toast.loading("در حال انتقال به بخش ورود هستید")
        setTimeout(()=>{
            toast.update(directingToast, {
                render: "با موفقیت وارد صفحه لاگین شدید",
                type: "success",
                isLoading: false,
                autoClose: 900,
            });
            navigate("/Auth");
        },1200)
    };

    const GoToDashboard = () => {
        const directingToast = toast.loading("در حال انتقال به داشبورد هستید")

        setTimeout(()=>{
            toast.update(directingToast, {
                render: "با موفقیت وارد پنل خود شدید",
                type: "success",
                isLoading: false,
                autoClose: 1000,
            });
            navigate("/Dashboard/Main");
        },1500)
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className={Style.landingContainer}>
            {isMenuOpen &&(
                <nav className={Style.mobileMenu}>
                    <div className={Style.mobileMenuHolder}>
                        <div className={Style.closeAndScreenMode}>
                            <div className={Style.mobileThemeSwitch} title={isDarkMode ? "حالت روشن" : "حالت تاریک"} onClick={toggleDarkMode}>
                                <img src={isDarkMode ? "/images/lightMode.svg" : "/images/darkMode.svg"} alt={isDarkMode ? "Light Mode" : "Dark Mode"}/>
                            </div>
                            <div className={Style.closeTheMobileMenu} onClick={toggleMenu}>
                                <img src={isDarkMode ? "/images/closeMenu.svg" : "/images/closeMenuWhite.svg"} alt="Close-Mobile-Menu"/>
                            </div>
                        </div>
                        <div className={Style.mobileMenuItemsContainer}>
                            {MenuItems.map((item) => (
                                <NavLink key={item.id} to={item.linkTo} className={Style.mobileMenuItem}>{item.title}</NavLink>
                            ))}
                        </div>
                        <div className={Style.mobileMenuSeparator}></div>
                        <div className={Style.academyLogoInMobileMenu}>
                            <img src="/images/Logo.png" alt="Logo"/>
                            <img src="/images/logoWordMark.png" alt="Logo-Word-Mark"/>
                        </div>
                    </div>
                </nav>
            )}
            <div className={clsx(Style.headerContainer, isHeaderFixed && Style.headerFixed)}>
                <div className={Style.header}>
                    <div className={Style.logoContainer}>
                        <div className={Style.logo}>
                            <img src="/images/Logo.png" alt="Site-Logo"/>
                        </div>
                        <div className={Style.logoWordMark}>
                            <img src="/images/logoWordMark.png" alt="Logo-WordMark"/>
                        </div>
                    </div>
                    <div className={Style.menu}>
                        {MenuItems.map((item) => (
                            <NavLink to={item.linkTo} key={item.id} className={({ isActive }) => isActive ? Style.menuItemActive : Style.menuItem}>{item.title}</NavLink>
                        ))}
                    </div>
                    <div className={Style.loginContainer} style={{width: token ? "auto" : "14.5%" , minWidth: token ? "100px" : "210px"}}>
                        <div className={Style.darkModeSwitch}
                        ref={themeButtonRef} onClick={handleThemeToggle}  title={isDarkMode ? "حالت روشن" : "حالت تاریک"}>
                            <motion.img
                                key={isDarkMode}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                src={isDarkMode ? "/images/lightMode.svg" : "/images/darkMode.svg"} alt={isDarkMode ? "Light Mode" : "Dark Mode"} />
                        </div>
                        {token ? 
                            <div className={Style.accountProfile} title="پنل کاربری" onClick={GoToDashboard}>
                                <img src={user?.userProfilePicture} alt="Profile-Picture" className={Style.profilePicture}/>
                            </div>  
                        :
                            <div className={Style.account} onClick={GoToAuth}>ورود یا ثبت نام</div>
                        }
                        <div className={Style.headerShowMoreButton} onClick={toggleMenu}>
                            <img src={isDarkMode ? "/images/mobileMenuOpenDarkMode.svg" : "/images/mobileMenuOpenLightMode.svg"} alt="Header-Show-More-Button"/>
                        </div>
                    </div>
                </div>
            </div>
            <main className={Style.outlet} style={{paddingTop: isHeaderFixed ? "125px" : "0"}}>
                <Outlet />
            </main>
            <div className={Style.bottom}>
                <div className={Style.navigateTopContainer}>
                    <button onClick={() => scrollToTop()} className={Style.navigateTop}>
                        <img src="/images/arrowUp.png" alt="Go To Top" className={Style.arrowUp}/>
                    </button>
                </div>
                <div className={Style.bottomMain}>
                    <div className={Style.knowMoreAboutAcademy}>
                        <div className={Style.academyLogoContainer}>
                            <div className={Style.academyLogo}></div>
                            <div className={Style.academyLogoWordMark}></div>
                        </div>
                        <span className={Style.academyPresentation}>گروه بازرگانی آهن یک با بیش از یک دهه سابقه ، با نگاهی متفاوت پاسخگوی نیاز تمامی مشتریان در زمینه تامین و توزیع انواع مقاطع و ورق فولادی ، اتصالات ، شیرآلات صنعتی و سایر تجهیزات در صنایع نفت و گاز و پتروشیمی ، ساختمانی و آبرسانی با دو شعبه فعال در بازار آهن شاد آباد و پونک ، به دو صورت آنلاین و حضوری ، امکان تامین کالاهای مورد نیاز صنایع مطابق با استاندارد های روز دنیا را فراهم نموده است.</span>
                    </div>
                    <div className={Style.bottomItemsContainer}>
                        {BottomMenu.map((menu) => (
                            <div key={menu.id} className={clsx(Style.bottomItem , menu.variant === "default" && Style.disappearBottomItem)}>
                                <span className={Style.footerItemTitle}>{menu.title}</span>
                                <div className={Style.footerItemSeparator}></div>
                                {menu.items.map((item) => (
                                    <a key={item.id} href={item.link} className={Style.footerLink} style={menu.variant === "contact" ? {color: "var(--link-color)",fontWeight: "500",} : undefined}>{item.title}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={Style.trustBadge}></div>
                </div>
                <div className={Style.copyRightReservedContainer}>
                    <div className={Style.copyRightReserved}>
                        <img src="/images/copyright.png" alt="CopyRight" className="copyRightReservedImage"/>
                        <span className={Style.copyRightOwnerShip}>تمام حقوق مادی و معنوی این طراحی متعلق به امیر محمد خیرابادی میباشد</span>
                    </div>
                    <div className={Style.socialMediasLink}>
                        {[  { src: '/images/linkedIn.png', alt: 'LinkedIn' }, 
                            { src: '/images/whatsApp.png', alt: 'WhatsApp' },
                            { src: '/images/faceBook.png', alt: 'FaceBook' },
                            { src: '/images/twitter.png', alt: 'Twitter' },
                            { src: '/images/instagram.png', alt: 'Instagram' }
                        ].map((social,index) =>(
                            <a key={index} href="#" className={Style.socialMedia}>
                                <img src={social.src} alt={social.alt}/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing