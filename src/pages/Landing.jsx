import React from 'react'
import Style from "../styles/Landing.module.css";
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const Landing = () => {
    return (
        <div className={Style.landingContainer}>
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
                        <div className={Style.darkModeSwitch}>
                            <img src="/images/darkMode.png" alt="DarkMode"/>
                        </div>
                        <div className={Style.account}>ورود یا ثبت نام</div>
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
                            <span className={Style.footerLink}>09109098222</span>
                            <span className={Style.footerLink}>09931227310</span>
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
                        <div className={Style.socialMedia}>
                            <img src="/images/linkedIn.png" alt="LinkedIn" />
                        </div>
                        <div className={Style.socialMedia}>
                            <img src="" alt="WhatsApp" />
                        </div>
                        <div className={Style.socialMedia}>
                            <img src="" alt="FaceBook" />
                        </div>
                        <div className={Style.socialMedia}>
                            <img src="" alt="Twitter" />
                        </div>
                        <div className={Style.socialMedia}>
                            <img src="" alt="Instagram" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing