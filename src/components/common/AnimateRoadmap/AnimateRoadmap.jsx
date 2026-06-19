import React from 'react'
import Style from './AnimateRoadmap.module.css'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AnimateRoadmap = () => {
    return (
        <motion.div className={Style.roadmap} style={{ overflow: "hidden",}} initial={{clipPath: "inset(0 100% 0 0)",}} whileInView={{clipPath: "inset(0 0% 0 0)",}} viewport={{ once: true }} transition={{ duration: 2.5, ease: "easeInOut",}}>
            <div className={Style.roadmapTopSide}>
                <div className={Style.lineContainers}>
                    <motion.img  initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 0.5,type: "spring",stiffness: 150,damping: 12,}} src="/images/htmlCss.png" alt="Html & Css" className={Style.roadmapIcon}/>
                    <svg className={Style.firstLine} width="318" height="151" viewBox="0 0 318 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path  d="M318 0C318 19.8296 313.887 39.465 305.897 57.7852C297.906 76.1054 286.194 92.7515 271.43 106.773C256.665 120.795 239.137 131.917 219.847 139.506C200.556 147.094 179.88 151 159 151C138.12 151 117.444 147.094 98.1533 139.506C78.8626 131.917 61.3345 120.795 46.57 106.773C31.8055 92.7515 20.0936 76.1053 12.1031 57.7852C4.11265 39.465 -1.8254e-06 19.8296 0 -1.52588e-05H31.8C31.8 15.8637 35.0901 31.572 41.4825 46.2281C47.8749 60.8843 57.2444 74.2012 69.056 85.4185C80.8676 96.6358 94.89 105.534 110.323 111.605C125.755 117.675 142.296 120.8 159 120.8C175.704 120.8 192.245 117.675 207.677 111.605C223.11 105.534 237.132 96.6358 248.944 85.4185C260.756 74.2012 270.125 60.8843 276.517 46.2282C282.91 31.572 286.2 15.8637 286.2 0H318Z" fill="#2184D6"/>
                    </svg>
                </div>
                <div className={Style.lineContainers}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 1,type: "spring",stiffness: 150,damping: 12,}} src="/images/javaScript.png" alt="JavaScript" className={Style.roadmapIcon}/>
                    <svg className={Style.secondLine} width="318" height="152" viewBox="0 0 318 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.000353971 151.626C-0.0260855 131.75 4.05481 112.062 12.01 93.6847C19.9652 75.3078 31.639 58.6026 46.3647 44.5228C61.0905 30.443 78.5799 19.2644 97.8343 11.6252C117.089 3.98599 137.731 0.0358267 158.583 0.000228515C179.435 -0.0353697 200.088 3.84429 219.362 11.4177C238.637 18.9912 256.156 30.11 270.919 44.1394C285.682 58.1689 297.4 74.8342 305.404 93.1838C313.409 111.533 317.542 131.208 317.568 151.084L285.811 151.139C285.79 135.238 282.484 119.498 276.08 104.818C269.677 90.1384 260.303 76.8062 248.492 65.5826C236.682 54.3591 222.666 45.464 207.247 39.4052C191.827 33.3465 175.305 30.2428 158.623 30.2713C141.942 30.2997 125.428 33.4599 110.024 39.5712C94.6207 45.6826 80.6292 54.6255 68.8486 65.8893C57.068 77.1531 47.729 90.5173 41.3649 105.219C35.0007 119.92 31.736 135.671 31.7571 151.572L0.000353971 151.626Z" fill="#FFFF7F"/>
                    </svg>
                </div>
                <div className={Style.lineContainers}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 1.5,type: "spring",stiffness: 150,damping: 12,}} src="/images/react.png" alt="React JS" className={Style.roadmapIcon}/>
                    <svg className={Style.thirdLine} width="318" height="152" viewBox="0 0 319 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M319 0C319 19.8953 314.874 39.5957 306.859 57.9765C298.843 76.3574 287.094 93.0586 272.284 107.127C257.473 121.195 239.889 132.354 220.538 139.968C201.187 147.581 180.446 151.5 159.5 151.5C138.554 151.5 117.813 147.581 98.462 139.968C79.1105 132.354 61.5274 121.195 46.7165 107.127C31.9055 93.0586 20.1568 76.3574 12.1412 57.9765C4.12559 39.5957 -1.83114e-06 19.8952 0 -1.52588e-05H31.9C31.9 15.9162 35.2005 31.6766 41.613 46.3812C48.0255 61.0859 57.4244 74.4469 69.2732 85.7013C81.1219 96.9558 95.1884 105.883 110.67 111.974C126.151 118.065 142.743 121.2 159.5 121.2C176.257 121.2 192.849 118.065 208.33 111.974C223.812 105.883 237.878 96.9558 249.727 85.7013C261.576 74.4469 270.975 61.0859 277.387 46.3812C283.8 31.6766 287.1 15.9162 287.1 0H319Z" fill="#70F3F6"/>
                    </svg>
                </div>
                <div className={Style.lineContainers}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 2,type: "spring",stiffness: 150,damping: 12,}} src="/images/figma.png" alt="Figma" className={Style.roadmapIcon}/>
                    <svg className={Style.fourthLine} width="318" height="152" viewBox="0 0 318 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.000353971 151.626C-0.0260855 131.75 4.05481 112.062 12.01 93.6847C19.9652 75.3078 31.639 58.6026 46.3647 44.5228C61.0905 30.443 78.5799 19.2644 97.8343 11.6252C117.089 3.98599 137.731 0.0358267 158.583 0.000228515C179.435 -0.0353697 200.088 3.84429 219.362 11.4177C238.637 18.9912 256.156 30.11 270.919 44.1394C285.682 58.1689 297.4 74.8342 305.404 93.1838C313.409 111.533 317.542 131.208 317.568 151.084L285.811 151.139C285.79 135.238 282.484 119.498 276.08 104.818C269.677 90.1384 260.303 76.8062 248.492 65.5826C236.682 54.3591 222.666 45.464 207.247 39.4052C191.827 33.3465 175.305 30.2428 158.623 30.2713C141.942 30.2997 125.428 33.4599 110.024 39.5712C94.6207 45.6826 80.6292 54.6255 68.8486 65.8893C57.068 77.1531 47.729 90.5173 41.3649 105.219C35.0007 119.92 31.736 135.671 31.7571 151.572L0.000353971 151.626Z" fill="#0FF29C"/>
                    </svg>
                </div>
            </div>
            <div className={Style.roadmapBottomSide}>
                <div className={Style.itemIntroduction}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 0.5,type: "spring",stiffness: 150,damping: 12,}} src="/images/htmlCssLogoWordMark.png" alt="htmlCssLogoWordMark" className={Style.itemLogoWordMark}/>
                    <motion.span initial={{ opacity: 0,filter: "blur(10px)",}} whileInView={{ opacity: 1,filter: "blur(0px)",}} transition={{delay: 0.5,duration: 0.5,}} className={Style.itemDescription}>برای شروع باید از زبان های مارکاپ استفاده کرد و بعد وارده استایل دهی شد</motion.span>
                </div>
                <div className={Style.itemIntroduction}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 1,type: "spring",stiffness: 150,damping: 12,}} src="/images/javascriptLogoWordMark.png" alt="javascriptLogoWordMark" className={Style.itemLogoWordMark}/>
                    <motion.span initial={{ opacity: 0,filter: "blur(10px)",}} whileInView={{ opacity: 1,filter: "blur(0px)",}} transition={{delay: 1,duration: 0.5,}} className={Style.itemDescription}>برای شروع باید از زبان های مارکاپ استفاده کرد و بعد وارده استایل دهی شد</motion.span>
                </div>
                <div className={Style.itemIntroduction}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 1.5,type: "spring",stiffness: 150,damping: 12,}} src="/images/reactJs.png" alt=" reactJs Logo Word Mark" className={Style.itemLogoWordMark}/>
                    <motion.span initial={{ opacity: 0,filter: "blur(10px)",}} whileInView={{ opacity: 1,filter: "blur(0px)",}} transition={{delay: 1.5,duration: 0.5,}} className={Style.itemDescription}>برای شروع باید از زبان های مارکاپ استفاده کرد و بعد وارده استایل دهی شد</motion.span>
                </div>
                <div className={Style.itemIntroduction}>
                    <motion.img initial={{opacity: 0,scale: 0,}} whileInView={{opacity: 1,scale: 1,}} transition={{delay: 2,type: "spring",stiffness: 150,damping: 12,}} src="/images/figmaLogoWordMark.png" alt="figmaLogoWordMark" className={Style.itemLogoWordMark}/>
                    <motion.span initial={{ opacity: 0,filter: "blur(10px)",}} whileInView={{ opacity: 1,filter: "blur(0px)",}} transition={{delay: 2,duration: 0.5,}} className={Style.itemDescription}>برای شروع باید از زبان های مارکاپ استفاده کرد و بعد وارده استایل دهی شد</motion.span>
                </div>
            </div>
        </motion.div>
    )
}

export default AnimateRoadmap