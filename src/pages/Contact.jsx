import React from 'react'
import Style from '../styles/Contact.module.css'
import SendUsMessage from '../components/common/SendUsMessage/SendUsMessage'
import ContactUsMediasData from '../Data/ContactUsMediasData'
import LeafletMap from '../components/common/leafletMap/LeafletMap'
import useDarkStore from '../store/DarkStore'
const Contact = () => {

  const isDarkMode = useDarkStore((state) => state.isDarkMode);

  return (
    <div className={Style.contactUsContainer}>
      <div className={Style.contactUsBanner}>
        <a href="tel:09109098222" className={Style.contactWithUs}>تماس با ما</a>
        <span className={Style.contactWithUsDescription}>با دریافت پشتیبانی با اکادمی بحر در ارتباط باشید</span>
      </div>
      <div className={Style.aboutUs}>
        <img src="/images/aboutUs.png" alt="About us Banner" className={Style.aboutUsBanner}/>
        <div className={Style.aboutUsMain}>
          <span className={Style.aboutUsTitle}>آکادمی بحر همیشه در کنار شما</span>
          <span className={Style.aboutUsDescription}>آشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزشآشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزش</span>
        </div>
      </div>
      <div className={Style.sendMailForUs}>
        <SendUsMessage/>
      </div>
      <div className={Style.howToFindUs}>
        <div className={Style.socialMediasBox}>
          <div className={Style.socialMediasContainer}>
            {ContactUsMediasData.map((Media)=>(
              <div className={Style.socialMedia} key={Media.id}>
                <div className={Style.socialMediaIconContainer}>
                  <img src={isDarkMode ?  Media.imageUrlDark  : Media.imageUrlLight} alt={Media.imageAlt} className={Style.socialMediaIcon} />
                </div>
                <div className={Style.mediaInfoContainer}>
                  <span className={Style.socialMediaTitle}>{Media.socialTitle}</span>
                  <a href={Media.socialHref} target="_blank" rel="noopener noreferrer" className={Style.socialMediasAddress}>{Media.socialAddress}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.ourAddress}>
          <LeafletMap/>
        </div>
      </div>
    </div>
  )
}

export default Contact