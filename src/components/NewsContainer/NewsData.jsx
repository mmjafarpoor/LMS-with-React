import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

const NewsData = ({
  showType,
  id,
  title,
  googleTitle,
  describe,
  currentImageAddress,
  currentView,
}) => {
  const navigate = useNavigate();
  const GoToNewsDetails = () => {
    navigate(`/News/${id}/${googleTitle.replaceAll(" ", "-")}`);
  };

  return (
    <div
      onClick={GoToNewsDetails}
      className={clsx(
        "rounded-3xl overflow-hidden cursor-pointer relative",
        showType === "grid" ? "w-78.75 h-122.5" : "w-240 h-140",
      )}
    >
      <img
        style={{
          maxWidth: "none",
          position: "absolute",
          ...(showType === "grid" ? { height: "490px" } : { height: "640px" }),
        }}
        src={currentImageAddress || "/images/PythonBig.png"}
        onError={(e) => {e.target.src = "/images/PythonBig.png";}}
      />
      <div className="w-[80%] mr-6 flex flex-col gap-2 absolute bottom-4 text-white">
        <p className="text-2xl font-bold!">{title}</p>
        <h2 className="text-md font-bold!">{describe} </h2>
        <div className="mt-2 flex flex-row gap-10 text-sm font-bold!">
          <div className="h-6 bg-[url(/images/whiteUser.png)] bg-no-repeat bg-position-[100%_0%] indent-8 text-white font-bold!">
            {currentView} بازدید
          </div>
          <div className="h-6 bg-[url(/images/book.png)] bg-no-repeat bg-position-[100%_0%] indent-12 text-white font-bold!">
            دروس
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsData;
