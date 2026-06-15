import React from "react";
import { useNavigate } from "react-router-dom";

const TeachersData = ({ teacherId, courseCounts, fullName }) => {
  const navigate = useNavigate();
  const GoToTeacherDetails = () => {
    navigate(`/Teachers/${teacherId}/${fullName.replaceAll(" ", "-")}`);
  };

  return (
    <div
      onClick={GoToTeacherDetails}
      className="w-74.5 h-140 rounded-3xl overflow-hidden flex flex-col gap-4 cursor-pointer"
    >
      <img
        style={{ maxWidth: "none", height: "386px" }}
        src={"/public/images/teacher.png"}
      />
      <div className="w-[80%] mr-6 flex flex-col gap-2 text-black">
        <p className="text-2xl font-bold!">{fullName}</p>
        <h2 className="text-md ">طراحی وب</h2>
        <p>تعداد دوره‌ها: {courseCounts} دوره</p>
      </div>
    </div>
  );
};

export default TeachersData;
