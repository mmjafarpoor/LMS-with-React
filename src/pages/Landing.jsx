import React from 'react'
import Style from "../styles/Landing.module.css";
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
                    <div className={Style.menu}></div>
                    <div className={Style.loginContainer}></div>
                </div>
            </div>
            <main>
                <Outlet/>
            </main>
            <div className={Style.bottom}></div>
        </div>
    )
}

export default Landing