import React from 'react'
import Style from './DashBoardProfile.module.css'
import ProfileTab from '../../../Data/ProfileTab'
import { NavLink, Outlet } from 'react-router-dom';
import userInfoStore from '../../../store/UserInfoStore';
const DashBoardProfile = () => {
    const user = userInfoStore((state) => state.user);

    return (
        <div className={Style.dashBoardProfileContainer}>
            <div className={Style.profileHeadingContainer}>
                <div className={Style.profileBannerContainer}>
                    <svg className={Style.profileBanner} width="1066" height="303" viewBox="0 0 1066 303" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={Style.profileBanner} d="M1042 0C1055.25 0 1066 10.7452 1066 24V279C1066 292.255 1055.25 303 1042 303H1001.84C984.087 303 972 283.257 972 265.5C972 220.489 935.511 184 890.5 184C845.489 184 809 220.489 809 265.5C809 283.257 796.913 303 779.156 303H24C10.7452 303 0 292.255 0 279V24C0 10.7452 10.7452 0 24 0H1042Z" fill="#3DCAE8"/>
                    </svg>
                </div>
                <div className={Style.userProfileContainer}>
                    <img src={user?.userProfilePicture} alt="user-profile" className={Style.userProfile}/>
                </div>
            </div>
            <div className={Style.userDetailContainer}>
                <div className={Style.userDetailRightSection}>
                    <div className={Style.userDetailRightSectionTop}>
                        <span className={Style.userName}>{user?.userName} {user?.userLastName}</span>
                        {/* <span className={Style.userRole}>( دانشجو )</span> */}
                    </div>
                    <div className={Style.userDetailRightSectionBottom}>
                        <div className={Style.userPhoneNumberContainer}>
                            <img src="/images/smartPhone.svg" alt="Phone-Icon" className={Style.phoneIcon} />
                            <a href={`tel:${user?.userPhoneNumber}`} target="_blank" rel="noopener noreferrer" className={Style.userPhoneNumber}>{user?.userPhoneNumber}</a>
                        </div>
                        <div className={Style.userMailAddressContainer}>
                            <img src="/images/mail.svg" alt="Phone-Icon" className={Style.phoneIcon} />
                            <a href={`mailto:${user?.userEmailAddress}`} target="_blank" rel="noopener noreferrer" className={Style.userEmailAddress}>{user?.userEmailAddress}</a>
                        </div>
                    </div>
                </div>
                <div className={Style.userDetailLeftSection}>
                    <div className={Style.aboutMeTitle}>درباره من</div>
                    <span className={Style.aboutMe}>{user?.userBiography}</span>
                </div>
            </div>
            <div className={Style.profileTabsContainer}>
                <div className={Style.tabsContainer}>
                    {ProfileTab.map((tab) => (
                        <NavLink to={tab.tabLink} key={tab.id} className={({ isActive }) => isActive ? Style.activeTab : Style.inactiveTab}>{tab.title}</NavLink>
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