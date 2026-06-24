import React from 'react'
import Style from './DashBoardMain.module.css'
import UserStats from '../../../Data/UserStats'
const DashBoardMain = () => {
    return (
        <div className={Style.dashBoardMainContainer}>
            <div className={Style.userStatsContainer}>
                <div className={Style.greetingMessage}>سلام، صبح‌ بخیر امیر</div>
                {UserStats.map((stat) => (
                    <div key={stat.id} className={Style.userStats}>
                        <div className={Style.statIconContainer}>
                            <img src={stat.imageUrlLightMode} alt={stat.imageUlt} className={Style.statIcon}/>
                        </div>
                        <div className={Style.statTextContainer}>
                            <div className={Style.statTitle}>{stat.name}</div>
                            <div className={Style.statCount}>{stat.stat}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={Style.latestNewsContainer}></div>

        </div>
    )
}

export default DashBoardMain