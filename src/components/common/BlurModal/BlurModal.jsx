import React from 'react'
import Style from './BlurModal.module.css'

const BlurModal = ({preview , confirm , discard}) => {
    return (
        <div className={Style.previewModal}>
            <div className={Style.previewContainer}>
                <h2 className={Style.previewHeadingTitle}>ادیتور عکس پیش نمایش</h2>
                <div className={Style.previewImageContainer}>
                    <img src={preview} alt="Preview-Image" className={Style.previewImage}/>
                </div>
                <div className={Style.modalActions}>
                    <div className={Style.confirmTheFile} onClick={confirm}>
                        <svg class="modal-accept-icon" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1.2"/>
                            <circle cx="12" cy="12" r="11" fill="url(#glassGradientAccept)" opacity="0.3"/>
                            <g stroke="rgba(255,255,255,0.9)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="7,12.5 10.5,16 17,9"/>
                            </g>
                            <g stroke="rgba(255,255,255,0.15)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.5">
                                <polyline points="7,12.5 10.5,16 17,9"/>
                            </g>
                            <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.08)" filter="url(#glassBlurAccept)"/>
                            <defs>
                                <radialGradient id="glassGradientAccept" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
                                <stop offset="60%" stop-color="rgba(255,255,255,0.02)"/>
                                <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
                                </radialGradient>
                                <filter id="glassBlurAccept" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className={Style.discardTheFile} onClick={discard}>
                        <svg class="modal-close-icon" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1.2"/>
                            <circle cx="12" cy="12" r="11" fill="url(#glassGradient)" opacity="0.3"/>
                            <g stroke="rgba(255,255,255,0.85)" stroke-width="1.8" stroke-linecap="round">
                                <line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>
                                <line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/>
                            </g>
                            <g stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-linecap="round" opacity="0.5">
                                <line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>
                                <line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/>
                            </g>
                            <defs>
                                <radialGradient id="glassGradient" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
                                <stop offset="70%" stop-color="rgba(255,255,255,0.02)"/>
                                <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlurModal