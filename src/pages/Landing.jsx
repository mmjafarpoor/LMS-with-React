import React, { useEffect, useState } from 'react'
import Style from "../styles/Landing.module.css";
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const Landing = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };
    useEffect(() => {
        if(isDarkMode){
            document.body.classList.add('dark-theme');
        }
        else{
            document.body.classList.remove('dark-theme');
        }
    },[isDarkMode]);

    const toggleMenu  = () =>{
        setIsMenuOpen(prevState => !prevState);
        console.log("Menu Status =",isMenuOpen)
    }
    useEffect(() => {
        const handleResize = () =>{
            if (window.innerWidth > 700 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[isMenuOpen]);
    
    return (
        <div className={Style.landingContainer}>
            {isMenuOpen &&(
                <nav className={Style.mobileMenu}>
                    <div className={Style.mobileMenuHolder}>
                        <div className={Style.closeTheMobileMenu} onClick={toggleMenu}></div>
                        <div className={Style.screenLightMode}>
                            <div className={Style.mobileLightMode}></div>
                            <div className={Style.mobileDarkMode}></div>
                        </div>
                        <div className={Style.mobileMenuItemsContainer}>
                            <div className={Style.mobileMenuItem}>خانه</div>
                            <div className={Style.mobileMenuItem}>دوره ها</div>
                            <div className={Style.mobileMenuItem}>اساتید</div>
                            <div className={Style.mobileMenuItem}>اخبار و مقالات</div>
                            <div className={Style.mobileMenuItem}>ارتباط باما</div>
                        </div>
                        <div className={Style.mobileMenuSeparator}></div>
                        <div className={Style.academyLogoInMobileMenu}>
                            <img src="/images/Logo.png" alt="Logo"/>
                            <img src="/images/logoWordMark.png" alt="Logo-Word-Mark"/>
                        </div>
                    </div>
                </nav>
            )}
            <div className={Style.headerContainer}>
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
                        <div className={Style.menuItem}>خانه</div>
                        <div className={Style.menuItem}>دوره ها</div>
                        <div className={Style.menuItem}>اساتید</div>
                        <div className={Style.menuItem}>اخبار و مقالات</div>
                        <div className={Style.menuItem}>ارتباط با ما</div>
                    </div>
                    <div className={Style.loginContainer}>
                        <div className={Style.darkModeSwitch} onClick={toggleDarkMode}  title={isDarkMode ? "حالت روشن" : "حالت تاریک"}>
                            <img src={isDarkMode ? "/images/lightMode.png" : "/images/darkMode.png"} alt={isDarkMode ? "Light Mode" : "Dark Mode"} />
                        </div>
                        <div className={Style.account}>ورود یا ثبت نام</div>
                        <div className={Style.headerShowMoreButton} onClick={toggleMenu}>
                            <img src="/images/headerMore.png" alt="Header-Show-More-Button"/>
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <Outlet/>
            </main>
            <div className={Style.bottom}>
                <div className={Style.navigateTopContainer}>
                    <div className={Style.navigateTop}></div>
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
                        <div className={clsx(Style.bottomItem,Style.disappearBottomItem)}>
                            <span className={Style.footerItemTitle}>لینک های مفید</span>
                            <div className={Style.footerItemSeparator}></div>
                            <span className={Style.footerLink}>ارزش های ما</span>
                            <span className={Style.footerLink}>هیئت مشاوران ما</span>
                            <span className={Style.footerLink}>شرکای ما</span>
                            <span className={Style.footerLink}>شریک شدن</span>
                            <span className={Style.footerLink}>در  پژوهشگاه کار کنید</span>
                        </div>
                        <div className={clsx(Style.bottomItem,Style.disappearBottomItem)}>
                            <span className={Style.footerItemTitle}>شرکت ما</span>
                            <div className={Style.footerItemSeparator}></div>
                            <span className={Style.footerLink}>با ما تماس بگیرید</span>
                            <span className={Style.footerLink}>معلم شوید</span>
                            <span className={Style.footerLink}>وبلاگ</span>
                            <span className={Style.footerLink}>مربی</span>
                            <span className={Style.footerLink}>مناسبت ها</span>
                        </div>
                        <div className={Style.bottomItem}>
                            <span className={Style.footerItemTitle}>در تماس باشید</span>
                            <div className={Style.footerItemSeparator}></div>
                            <a  href="tel:09109098222" className={Style.footerLink} style={{color:"#1B75D0"}}>09109098222</a>
                            <a  href="tel:09931227310" className={Style.footerLink} style={{color:"#1B75D0"}}>09931227310</a>
                        </div>
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