import React from 'react'
import SendUsMessage from '../components/common/SendUsMessage/SendUsMessage'
import ContactUsMediasData from '../Data/ContactUsMediasData'
import LeafletMap from '../components/common/leafletMap/LeafletMap'
import useDarkStore from '../store/DarkStore'
import { AboutUsBanner, ContactUsBanner, ContactUsBannerMobile } from '@/assets/Gallery'
import { MAX_BREAKPOINTS } from '@/core/constants/BreakPoints'
import useMediaQuery from '@/hooks/useMediaQuery'
const Contact = () => {

  const isDarkMode = useDarkStore((state) => state.isDarkMode);

  const isMobile = useMediaQuery(MAX_BREAKPOINTS.sm);
  
  return (
    <div className="width-full flex flex-col flex-nowrap items-center gap-15">
      <div className="w-[90%] h-auto min-h-88.25 aspect-1320/353 mt-11.25 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center" style={{backgroundImage: `url(${isMobile ? ContactUsBannerMobile : ContactUsBanner})`,}}>
        <a href="tel:09109098222" className="text-white font-semibold text-4xl whitespace-nowrap sm:text-5xl">تماس با ما</a>
        <span className="text-white font-medium text-[0.95rem] whitespace-nowrap sm:text-xl">با دریافت پشتیبانی با اکادمی بحر در ارتباط باشید</span>
      </div>
      <div className="w-[90%] max-h-max flex flex-col items-center gap-0 lg:w-[90%] lg:max-h-111.25 lg:flex-row lg:gap-25">
        <img src={AboutUsBanner} alt="About us Banner" className="w-[90%] h-auto aspect-[355-378] sm:w-104.5 sm:h-111.25"/>
        <div className="w-max h-max max-w-4/5 gap-3.5 mt-7 flex flex-col sm:mt-17.5 sm:gap-6.25">
          <span className="font-black text-[clamp(1.25rem,4vw,1.6rem)] sm:text-[clamp(1.7rem,1.55vw,1.9rem)] truncate">آکادمی بحر همیشه در کنار شما</span>
          <span className="font-semibold text-[clamp(0.85rem,2.5vw,1rem)] sm:text-[clamp(1rem,1vw,1.2rem)] text-[#B5B5B5]">آشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزش</span>
        </div>
      </div>
      <div className="w-[85%] sm:w-[70%]">
        <SendUsMessage/>
      </div>
      <div className="w-max flex flex-col items-center gap-10 md:w-9/10 md:flex-row mb-12.5">
        <div className="w-max h-max bg-(--socialMedia-container-bg) rounded-3xl">
          <div className="h-max p-5 flex flex-col gap-5">
            {ContactUsMediasData.map((Media)=>(
              <div className="min-w-76.5 w-76.5 h-16.5 flex bg-(--socialMedia-bg) rounded-[18px] md:min-w-81.5 md:max-w-81.5 md:w-81.5" key={Media.id}>
                <div className="w-17.5 h-full flex items-center justify-center">
                  <img src={isDarkMode ?  Media.imageUrlDark  : Media.imageUrlLight} alt={Media.imageAlt} className="w-10 h-10" />
                </div>
                <div className="w-[calc(100%-70px)] h-full flex flex-col justify-evenly">
                  <span className="font-black text-[1.08rem] truncate">{Media.socialTitle}</span>
                  <a href={Media.socialHref} target="_blank" rel="noopener noreferrer" className="w-max font-semibold text-[#B5B5B5] cursor-pointer select-none truncate transition-colors duration-300 ease-in-out hover:text-(--link-color)">{Media.socialAddress}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-max h-92 rounded-3xl overflow-hidden md:w-[calc(100%-406px)]">
          <LeafletMap/>
        </div>
      </div>
    </div>
  )
}

export default Contact