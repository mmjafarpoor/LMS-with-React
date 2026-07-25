import React from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";

const TeacherCourses = (courses) => {
  const navigate = useNavigate();

  console.log(courses.courses);
  const GoToCourseDetails = (courseId) => {
    navigate(`/Courses/${courseId}`);
  };

  return (
    // <div className="flex flex-col items-center justify-center">
    <div className="h-fit w-full flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-0">
      {courses?.courses?.map((top) => (
        <div
          key={top?.courseId}
          className=" w-100 scale-85 sm:scale-100 -mt-15 sm:mt-0 relative flex flex-col items-center "
        >
          <div
            onClick={() => GoToCourseDetails(top?.courseId)}
            className="overflow-hidden h-54 w-95 rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <img
              src={top?.imageAddress || "/images/css3.svg"}
              onError={(e) => {
                e.target.src = "/images/css3.svg";
              }}
            />
          </div>
          <div className="h-45 w-90 -translate-y-10 hover:-translate-y-5 flex flex-col items-center justify-center gap-4 rounded-2xl bg-(--header-bg) shadow-[0_0px_8px_var(--courses-cards-shadow-color)] transition-all duration-250 z-10000">
            <p className="w-[85%] font-semibold!">
              {top?.title || "عنوان محصول"}
            </p>
            <p className="w-[85%] max-h-20 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">{top?.miniDescribe}</p>
            <div className="w-[90%] pb-2 flex flex-row items-center justify-between">
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
            </div>
          </div>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default TeacherCourses;
