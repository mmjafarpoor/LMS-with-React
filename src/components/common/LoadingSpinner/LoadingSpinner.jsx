import React, { useEffect } from 'react'
import Style from './LoadingSpinner.module.css'
import useDarkStore from '../../../store/DarkStore';

const LoadingSpinner = () => {
    
    const isDarkMode = useDarkStore((state) => state.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [isDarkMode])

    return (
        <div className={Style.loading}>
            <div className={Style.spinner}>
                <span className={Style.loadingText}>Loading</span>
            </div>
        </div>
    )
}

export default LoadingSpinner