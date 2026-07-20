import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeachersList } from "../../../core/services/teachersService/teachersService";

const NewsCards = () => {
  const [teachersItems, setTeachersItems] = useState([]);
  const currentItems = teachersItems.slice(0, 4);
  
  const fetchTeachers = async () => {
    const response = await getTeachersList();
    setTeachersItems(response.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTeachers();
  }, []);

  const navigate = useNavigate();
  const GoToTeacherDetails = (teacherData) => {
    navigate(
      `/Teachers/${teacherData.teacherId}/${teacherData.fullName.replaceAll(" ", "-")}`,
    );
  };
  const GoToTeachersPage = () => {
    navigate("/Teachers");
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-6 items-center lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
        <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-semibold!">
          اساتید برتر
        </h1>
        <p className="flex items-center text-center lg:text-[16px] sm:text-[14px] text-[10px] w-[60%] text-(--news-description)">
          کلاس های مسترلایف توسط رهبران صنعت آموزش داده می شود که هیجان زده
          هستند ابزارها، تکنیک ها و سفرهای حرفه ای خود را با شما به اشتراک
          بگذارند.
        </p>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-center gap-5">
        {currentItems.map((teacherData) => (
          <div
            onClick={() => GoToTeacherDetails(teacherData)}
            className="w-74.5 h-140 rounded-3xl overflow-hidden flex flex-col gap-4 cursor-pointer"
          >
            <img
              style={{ maxWidth: "none", height: "386px" }}
              src={"/images/teacher.png"}
            />
            <div className="w-[80%] mr-6 flex flex-col gap-2">
              <p className="text-2xl font-bold!">{teacherData?.fullName}</p>
              <h2 className="text-md ">طراحی وب</h2>
              <p>تعداد دوره‌ها: {teacherData?.courseCounts} دوره</p>
            </div>
          </div>
        ))}
      </div>
      <p
        onClick={GoToTeachersPage}
        className="-mt-5 px-5 py-4 bg-(--button-bg) rounded-4xl font-semibold! cursor-pointer"
      >
        دوست داری بیشتر ببینی؟
      </p>
    </div>
  );
};

export default NewsCards;
