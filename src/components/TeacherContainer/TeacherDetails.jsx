import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TeachersDetails = () => {
  const { teacherId } = useParams();
  const [teacherProfile, setTeacherProfile] = useState(null);
  // const [teacherCourses, setTeacherCouses] = useState([]);
  const fetchItem = async () => {
    const response = await fetch(
      `http://188.121.104.25:3001/Home/GetTeacherDetails?TeacherId=${teacherId}`,
    );
    const data = await response.json();
    setTeacherProfile(data);
    // setTeacherCouses(data.courses);
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  console.log(teacherProfile)

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] mt-10 mb-10 flex flex-row flex-wrap gap-y-5 justify-around">
        <div className="w-[90%] md:w-[35%] lg:w-[30%] xl:w-[25%] rounded-3xl flex flex-col items-center bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] ">
          <div className="w-full mt-5 flex flex-col items-center gap-5">
            <img src="/images/bahr.png" />
            <p className="font-bold!">{teacherProfile?.fullName}</p>
          </div>

          <div className="w-full mb-3 flex flex-col items-center gap-1">
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <p className="font-bold!">تعداد دوره‌ها</p>
              <p className="text-(--news-description) font-bold!">
                {teacherProfile?.courses.length}
              </p>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <p className="font-bold!">تجربه</p>
              <p className="text-(--news-description) font-bold!">+10 سال</p>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <p className="font-bold!">زبان مورد علاقه</p>
              <p className="text-(--news-description) font-bold!">پایتون</p>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between">
              <p className="font-bold!">شبکه‌های اجتماعی</p>
              <div className="flex flex-row gap-1">
                {[
                  { src: "/images/linkedIn.png", alt: "LinkedIn" },
                  { src: "/images/faceBook.png", alt: "FaceBook" },
                  { src: "/images/twitter.png", alt: "Twitter" },
                  { src: "/images/instagram.png", alt: "Instagram" },
                ].map((social, index) => (
                  <a key={index} className="cursor-pointer">
                    <img src={social.src} alt={social.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-[60%] lg:w-[67%] flex flex-col gap-3">
          <h1 className="text-center md:text-start text-3xl font-bold!">
            بیوگرافی
          </h1>
          <h2 className="text-center md:text-start">
            من توسعه دهنده فرانت و دولور قالب برای راستچین هستم. من اشتیاق جدی
            به جلوه‌های رابط کاربری، انیمیشن‌ها و ایجاد تجربه‌های کاربری بصری و
            پویا دارم. من توسعه دهنده فرانت و دولور قالب برای راستچین هستم. من
            اشتیاق جدی به جلوه‌های رابط کاربری، انیمیشن‌ها و ایجاد تجربه‌های
            کاربری بصری و پویا دارم.من توسعه دهنده فرانت و دولور قالب برای
            راستچین هستم. من اشتیاق جدی به جلوه‌های رابط کاربری، انیمیشن‌ها و
            ایجاد تجربه‌های کاربری بصری و پویا دارم.من توسعه دهنده فرانت و دولور
            قالب برای راستچین هستم. من اشتیاق جدی به جلوه‌های رابط کاربری،
            انیمیشن‌ها و ایجاد تجربه‌های کاربری بصری و پویا دارم.
          </h2>
        </div>
        <div className="pb-3 flex flex-col gap-4 items-center lg:w-[50%] xl:w-[40%] lg:bg-[url(/public/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
          <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-semibold!">
            دوره‌های استاد
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TeachersDetails;
