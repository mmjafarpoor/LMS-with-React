import React, { useState } from 'react'
import Style from './DashBoardProfile.module.css'
import ProfileTab from '../../../Data/ProfileTab'
import { Link, Outlet } from 'react-router-dom';
const DashBoardProfile = () => {

    const [selectedItem, setSelectedItem] = useState(ProfileTab[0].id);

    return (
        <div className={Style.dashBoardProfileContainer}>
            <div className={Style.profileHeadingContainer}>
                <div className={Style.profileBannerContainer}>
                    <svg className={Style.profileBanner} width="1066" height="303" viewBox="0 0 1066 303" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={Style.profileBanner} d="M1042 0C1055.25 0 1066 10.7452 1066 24V279C1066 292.255 1055.25 303 1042 303H1001.84C984.087 303 972 283.257 972 265.5C972 220.489 935.511 184 890.5 184C845.489 184 809 220.489 809 265.5C809 283.257 796.913 303 779.156 303H24C10.7452 303 0 292.255 0 279V24C0 10.7452 10.7452 0 24 0H1042Z" fill="#3DCAE8"/>
                    </svg>
                </div>
                <div className={Style.userProfileContainer}>
                    <img src="/images/userProfile.svg" alt="" className={Style.userProfile} />
                </div>
            </div>
            <div className={Style.userDetailContainer}>
                <div className={Style.userDetailRightSection}>
                    <div className={Style.userDetailRightSectionTop}>
                        <span className={Style.userName}>امیر محمد</span>
                        <span className={Style.userRole}>( دانشجو )</span>
                    </div>
                    <div className={Style.userDetailRightSectionBottom}>
                        <div className={Style.userPhoneNumberContainer}>
                            <img src="/images/smartPhone.svg" alt="Phone-Icon" className={Style.phoneIcon} />
                            <a href="tel:09373808890" target="_blank" rel="noopener noreferrer" className={Style.userPhoneNumber}>09373808890</a>
                        </div>
                        <div className={Style.userMailAddressContainer}>
                            <img src="/images/mail.svg" alt="Phone-Icon" className={Style.phoneIcon} />
                            <a href="mailto:example@email.com" target="_blank" rel="noopener noreferrer" className={Style.userEmailAddress}>Example@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div className={Style.userDetailLeftSection}>
                    <div className={Style.aboutMeTitle}>درباره من</div>
                    <span className={Style.aboutMe}>من امیر محمد دانشجوی نوب سگ هستم که اخیرا دارم یاد میگیرم برنامه نویسی رو و امیدوارم از نوبیت دربیام و بتونم یه کاری پیدا کنم تو دنیای دیجیتال ، ممنون از همه 😊</span>
                </div>
            </div>
            <div className={Style.profileTabsContainer}>
                <div className={Style.tabsContainer}>
                    {ProfileTab.map((tab) => (
                        <Link to={tab.tabLink} key={tab.id} className={selectedItem === tab.id ? Style.activeTab : Style.inactiveTab} onClick={() => setSelectedItem(tab.id)}>{tab.title}</Link>
                    ))}
                </div>
            </div>
            <main className={Style.tabContent}>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default DashBoardProfile