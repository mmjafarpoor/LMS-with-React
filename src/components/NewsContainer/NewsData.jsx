import { NewsFallBack } from "@/assets/Gallery";
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
  currentLikeCount,
  currentDissLikeCount,
}) => {

  const navigate = useNavigate();
  const GoToNewsDetails = () => {
    navigate(`/News/${id}/${googleTitle.replaceAll(" ", "-")}`);
  };

  return (
    <div
      onClick={GoToNewsDetails}
      className={clsx(
        "rounded-4xl overflow-hidden cursor-pointer relative",
        showType === "grid" ? "w-[85%] lg:w-[calc(49%-8px)] xl:w-[calc(32%-5px)] min-w-70 max-w-100 h-122.5" : "w-[88%] h-111",
      )}
    >
      {/* Image */}
      <img
        style={{
          width: "100%",
          maxWidth: "100%",
          position: "absolute",
          height: "100%",
        }}
        src={currentImageAddress || NewsFallBack}
        alt={"News-Image"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.target.src = NewsFallBack;
        }}
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/25 to-transparent pointer-events-none">
        {/* content */}
        <div className="w-full px-5 flex flex-col gap-2 absolute bottom-4 text-white z-10">
          <p className="text-2xl font-black truncate drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">{title}</p>
          <h2 className="max-h-20 text-md font-black overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{describe}</h2>
          <div className="mt-2 flex flex-row justify-between items-center text-sm font-bold!">
            <div className="h-6 bg-[url(/images/whiteUser.png)] bg-no-repeat bg-position-[100%_0%] indent-8 text-white font-bold! drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {currentView} بازدید
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center">
                <div
                  className="h-6 w-10 mb-2.5 bg-[url(/images/thumbs-up.svg)] bg-no-repeat bg-position-[50%] invert-100"
                ></div>
                <div className="font-bold!">{currentLikeCount || 0}</div>
              </div>
              <div className="flex flex-row items-center">
                <div className="h-6 w-10 mt-1.5 bg-[url(/images/thumbs-down.svg)] bg-no-repeat bg-position-[50%] -scale-x-100 invert-100"></div>
                <div className="font-bold!">{currentDissLikeCount || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsData;
