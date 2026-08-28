import React from 'react'

const BlurModal = ({preview , confirm , discard}) => {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/25 backdrop-blur-[12px] backdrop-saturate-[180%] z-99999">
            {/* Preview Container */}
            <div className="
                w-[90%] max-w-175 h-auto 
                aspect-square p-8 rounded-4xl
                bg-white/8 backdrop-blur-[20px] backdrop-saturate-[190%]
                border border-white/20 
                shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset]
                text-white text-shadow-[0_2px_8px_rgba(0,0,0,0.3)] 
                transition-all duration-250 ease-in-out 
                flex flex-col items-center justify-between"
            >
                {/* Heading Title */}
                <h2 className="
                    text-[1.7rem] sm:text-[2.1rem] font-semibold
                    mb-3 px-[1.2rem] py-[0.1rem] inline-block
                    backdrop-blur-xs bg-white/4
                    border border-white/8 rounded-[60px]
                    select-none"
                >
                    پیش نمایش عکس
                </h2>
                {/* Image Container */}
                <div className="w-full max-w-120 h-auto aspect-square rounded-4xl overflow-hidden">
                    <img src={preview} alt="Preview-Image" className="w-full h-full"/>
                </div>
                {/* Actions */}
                <div className="w-full max-w-100 flex items-center justify-between">
                    {/* Confirm */}
                    <div className="
                            w-12.5 h-12.5 rounded-full
                            flex items-center justify-center
                            bg-white/7 backdrop-blur-[10px] backdrop-saturate-[160%] 
                            transition-all duration-250 cursor-pointer 
                            shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                            hover:bg-white/18 
                            hover:backdrop-blur-[14px] hover:backdrop-saturate-[200%] 
                            hover:scale-[1.03]
                        "
                        onClick={confirm}
                    >
                        <ConfirmIcon/>
                    </div>
                    {/* Edit */}
                    <div className="
                            w-12.5 h-12.5 rounded-full
                            flex items-center justify-center
                            bg-white/7 backdrop-blur-[10px] backdrop-saturate-[160%]
                            transition-all duration-250 cursor-pointer
                            shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                            hover:bg-white/18
                            hover:backdrop-blur-[14px] hover:backdrop-saturate-[200%]
                            hover:scale-[1.03]
                        "
                    >
                        <EditIcon/>
                    </div>
                    {/* Discard */}
                    <div className="
                            w-12.5 h-12.5 rounded-full
                            flex items-center justify-center
                            bg-white/7 backdrop-blur-[6px]
                            transition-all duration-250 cursor-pointer
                            shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                            hover:bg-white/18 hover:backdrop-blur-[10px] hover:rotate-90
                        "
                        onClick={discard}
                    >
                        <DiscardIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlurModal

const ConfirmIcon = () => {
        return(
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
        )
    }
    
    const EditIcon = () => {
    return (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
            <circle cx="12" cy="12" r="11" fill="url(#editGradient)" opacity="0.3"/>

            {/* Pencil */}
            <path
                d="M7 17L7.5 14.5L15.8 6.2C16.4 5.6 17.4 5.6 18 6.2L18.3 6.5C18.9 7.1 18.9 8.1 18.3 8.7L10 17H7Z"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Pencil separation */}
            <path
                d="M15.1 7.5L16.8 9.2"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            {/* Glow */}
            <path
                d="M7 17L7.5 14.5L15.8 6.2C16.4 5.6 17.4 5.6 18 6.2L18.3 6.5C18.9 7.1 18.9 8.1 18.3 8.7L10 17H7Z"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
            />
            <defs>
                <radialGradient id="editGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
                    <stop offset="60%" stopColor="rgba(255,255,255,0.02)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)"/>
                </radialGradient>
            </defs>
        </svg>
    );
};
    const DiscardIcon = () => {
        return(
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
        )
    }