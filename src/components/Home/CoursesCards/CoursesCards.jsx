import React, { useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { getCourseTop } from "../../../core/services/coursesService/coursesService";
import { toast } from "react-toastify";

const CoursesCards = () => {

  const [courseList, setCourseList] = useState([]);

  const fetchCourse = async() => {
    try {
      const response = await getCourseTop(6);
      console.log("Course Top =",response.data);
      await setCourseList(response.data);
    } catch (error) {
      console.log(error);
      toast.error("در بارگذاری دوره ها خطایی پیش آمد");
    }
  }

  useEffect(() => {
    fetchCourse();
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-20 w-50 flex flex-col gap-6 items-center lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
        <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-semibold!">
          برترین دوره‌ها
        </h1>
      </div>
      <div className="h-fit w-[90%] flex flex-row flex-wrap items-center justify-center gap-15">
        {courseList.map((top) => (
          <div key={top.courseId} className=" w-100 mt-5 relative flex flex-col items-center">
            <img className="" src={top?.imageAddress || "/images/css3.svg"} onError={(e) => {e.target.src = "/images/css3.svg";}}/>
            <div className="h-45 w-85 -translate-y-15 hover:-translate-y-5 flex flex-col items-center justify-center gap-4 rounded-2xl bg-(--header-bg) shadow-[0_0px_8px_var(--courses-cards-shadow-color)] transition-all duration-250 z-10000">
              <div className="w-[90%] font-semibold!">
                <p>{top?.title || "عنوان محصول"}</p>
              </div>
              <div className="w-[90%] pb-2 flex flex-row items-center justify-between border-b-2 border-[#DDDDDD]">
                <Rating
                  style={{ direction: "ltr" }}
                  className="h-8 max-w-40 xs:max-w-20 md:max-w-30 lg:max-w-30 gap-2"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#EAEAEA",
                  }}
                  value={top?.courseRate?.avg}
                  readOnly
                />
                <p className="w-fit py-2 pl-10 indent-10 rounded-xl text-white font-semibold! bg-[url(/images/teaching.png)] bg-no-repeat bg-position-[90%_50%] bg-(--button-bg)">
                  {top?.teacherName || "مدرس دوره"}
                </p>
              </div>
              <div className="w-[90%] flex flex-row items-center justify-between">
                <p className="w-fit py-2 pl-2.5 indent-10 rounded-xl text-[#3DCAE8] font-semibold! bg-[url(/images/participantIcon.png)] bg-no-repeat bg-position-[90%_45%] bg-(--input-bg-second)">
                  {top?.capacity || "0"}
                </p>
                <p className="text-[#28B200]">
                  {top?.cost} تومان<span className="text-[#FF1515]"> 200000 تومان</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCards;
