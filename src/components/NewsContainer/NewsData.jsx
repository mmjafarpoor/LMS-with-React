import clsx from "clsx";
import React from "react";

const NewsData = ({
  showType,
  title,
  describe,
  currentImageAddress,
  currentView,
}) => {
  return (
    <div
      className={clsx(
        "rounded-3xl overflow-hidden relative",
        showType === "grid" ? "w-78.75 h-122.5" : "w-240 h-140",
      )}
    >
      <img
        style={{
          maxWidth: "none",
          position: "absolute",
          ...(showType === "grid" ? { height: "490px" } : { height: "640px" }),
        }}
        src={currentImageAddress}
      />
      <div className="w-[80%] mr-6 flex flex-col gap-2 absolute bottom-4 text-black">
        <p className="text-2xl font-semibold!">{title}</p>
        <h2 className="text-md font-semibold!">{describe} </h2>
        <div className="mt-2 flex flex-row gap-10 text-sm font-semibold!">
          <div className="h-6 bg-[url(/public/images/whiteUser.png)] bg-no-repeat bg-position-[100%_0%] indent-8 text-white invert-100">
            {currentView} بازدید
          </div>
          <div className="h-6 bg-[url(/public/images/book.png)] bg-no-repeat bg-position-[100%_0%] indent-12 text-white invert-100">
            دروس
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsData;
