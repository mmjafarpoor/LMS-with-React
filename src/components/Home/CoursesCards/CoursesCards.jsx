import React, { useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { getCourseTop } from "../../../core/services/coursesService/coursesService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CoursesCards = () => {
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState([]);

  const fetchCourse = async () => {
    try {
      const response = await getCourseTop(6);
      console.log("Course Top =", response.data);
      await setCourseList(response.data);
    } catch (error) {
      console.log(error);
      toast.error("در بارگذاری دوره ها خطایی پیش آمد");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const GoToCourseDetails = (courseId) => {
    navigate(`/Courses/${courseId}`);
  };

  const GoToTeacherDetails = (teacherId, teacherName) => {
    navigate(
      `/Teachers/${teacherId}/${teacherName.replaceAll(" ", "-")}`,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-20 w-50 mb-7 sm:mb-0 flex flex-col gap-6 items-center lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
        <h1 className="lg:text-[30px] text-[26px] font-black">
          برترین دوره‌ها
        </h1>
      </div>
      <div className="h-fit w-[90%] flex flex-row flex-wrap items-center justify-center gap-x-15">
        {courseList.map((top) => (
          <div
            key={top?.courseId}
            className=" w-100 scale-85 sm:scale-100 -mt-15 sm:mt-0 relative flex flex-col items-center "
          >
            <div onClick={() => GoToCourseDetails(top?.courseId)} className="overflow-hidden h-54 w-95 rounded-2xl flex items-center justify-center cursor-pointer">
              <img
                className="w-full h-full overflow-hidden"
                src={top?.imageAddress || "/images/css3.svg"}
                onError={(e) => {
                  e.target.src = "/images/css3.svg";
                }}
              />
            </div>
            <div className="h-45 w-85 -translate-y-15 hover:-translate-y-5 flex flex-col items-center justify-center gap-4 rounded-2xl bg-(--header-bg) shadow-[0_0px_8px_var(--courses-cards-shadow-color)] transition-all duration-250 z-10000">
              <div className="w-[90%] font-semibold!">
                <p className="font-semibold!">{top?.title || "عنوان محصول"}</p>
              </div>
              <div className="w-[90%] pb-2 flex flex-row items-center justify-between border-b-2 border-[#DDDDDD]">
                <Rating
                  style={{ direction: "ltr" }}
                  className="h-8 max-w-30 gap-1"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#EAEAEA",
                  }}
                  value={top?.courseRate?.avg}
                  readOnly
                />
                <p onClick={() => GoToTeacherDetails(top?.teacherId, top?.teacherName)} className="w-fit py-2 pl-4 indent-12 rounded-xl lg:text-[14px] text-xs text-white font-black bg-[url(/images/teaching.svg)] bg-no-repeat bg-position-[90%_50%] bg-(--button-bg) cursor-pointer transition-colors duration-300 hover:bg-(--button-hover)">
                  {top?.teacherName || "مدرس دوره"}
                </p>
              </div>
              <div className="w-[90%] flex flex-row items-center justify-between">
                <p className="w-fit py-2 pl-2.5 indent-10 rounded-xl text-[#3DCAE8] font-semibold! bg-[url(/images/participantIcon.svg)] bg-no-repeat bg-position-[90%_45%] bg-(--input-bg-second)">
                  {top?.capacity || "0"}
                </p>
                <p className="font-semibold!">{top?.cost} تومان</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCards;
