import React from 'react'
import Style from '../styles/Error404.module.css'
import { useNavigate } from 'react-router-dom'


const Error404 = () => {

    const navigate = useNavigate();

    return (
        <div className={Style.error404}>
            <div className={Style.errorContainer}>
                <span className={Style.errorCode}>404</span>
                <span className={Style.errorText}>مشکلی پیش امده</span>
                <button className={Style.backToPrevPage} onClick={() => navigate(-1)} >
                    <span className={Style.buttonText}>بازگشت به صفحه قبلی</span>
                    <img src="/images/leftArrow.png" alt="" className={Style.buttonArrow} />
                </button>
            </div>
        </div>
    )
}

export default Error404