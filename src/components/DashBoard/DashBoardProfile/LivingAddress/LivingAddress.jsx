import React from 'react'
import Style from './LivingAddress.module.css'
import LeafletMap from '../../../common/leafletMap/LeafletMap'
import SetWayPointMap from '../../../common/leafletMap/SetWayPointMap'
const LivingAddress = () => {
    return (
        <div className={Style.livingAddressContainer}>
            <span className={Style.livingAddressTitle}>داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید</span>
            <div className={Style.navigationMapContainer}>
                <SetWayPointMap/>
            </div>
        </div>
    )
}

export default LivingAddress