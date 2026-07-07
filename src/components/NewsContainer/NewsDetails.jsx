import React, { useState, useEffect } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import Comment from "./Comment";
import clsx from "clsx";

const NewsDetails = () => {
  const [fav, setFav] = useState(false);

  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [usersRate, setUsersRate] = useState(null);
  const fetchItem = async () => {
    const response = await fetch(`http://188.121.104.25:3001/News/${id}`);
    const data = await response.json();
    setItem(data.detailsNewsDto);
    setUsersRate(data.detailsNewsDto.newsRate);
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="w-full mt-10 mb-10 flex justify-center">
      <div className="w-[97%] md:w-[90%] flex flex-row flex-wrap justify-around">
        <div className="w-[90%] lg:w-[70%]">
          <div className="w-full flex justify-center">
            <div className="w-fit flex justify-center relative">
              <img
                style={{ width: "950px", borderRadius: "24px" }}
                src="/images/PythonBig.png"
              />
              <div className="p-1 flex flex-row items-center gap-5 rounded-tr-3xl bg-(--bg-color) absolute bottom-0 left-0">
                <div className="flex flex-row items-center">
                  <div className="h-10 w-10 bg-[url(/images/like.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.currentLikeCount}</div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="h-10 w-10 bg-[url(/images/disslike.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.currentDissLikeCount}</div>
                </div>
              </div>
              <div
                onClick={() => setFav(!fav)}
                className={clsx(
                  "absolute -right-58 -bottom-59 h-100 w-100 scale-45 sm:-right-77 sm:-bottom-77 sm:h-120 sm:w-120 sm:scale-60 cursor-pointer transition-all duration-500",
                  fav
                    ? "bg-red-700"
                    : "bg-(--input-bg) shadow-[0_0px_8px_var(--news-shadow-color)]",
                )}
                style={{
                  clipPath:
                    "path('M50,15 C35,-5 0,10 0,40 C0,70 50,100 50,100 C50,100 100,70 100,40 C100,10 65,-5 50,15')",
                }}
              ></div>
            </div>
          </div>
          <div className="w-full">
            <div className="pt-10 pb-10 w-full flex flex-col justify-center gap-4 ">
              <p className="font-bold! text-[24px] text-center lg:text-start lg:indent-8">
                {item?.title}
              </p>
              <h2 className="text-[15px] text-(--news-description) text-center lg:text-start lg:mr-8">
                {item?.describe}
              </h2>
            </div>
          </div>
        </div>

        <div className="w-[90%] lg:w-[25%] flex flex-col gap-5">
          <div className="pt-5 pb-5 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex flex-col items-center justify-around">
            <p className="mb-5 text-[30px] font-semibold!">
              {item?.newsCatregoryName}
            </p>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/images/watch.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">بازدید</p>
              </div>
              <div>{item?.currentView}</div>
            </div>
            <div className="mt-1.5 h-12 w-[85%] flex items-center justify-between">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/images/calendar-start.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">تاریخ</p>
              </div>
              <div>1/1/1</div>
            </div>
          </div>
          <div className="h-20 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex justify-center items-center">
            <div className="w-[85%] flex flex-row items-center gap-2">
              <img
                style={{ height: "64px", borderRadius: "100%" }}
                src="/images/bob.png"
              />
              <div className="flex flex-col gap-1">
                <p>باب اسفنجی</p>
                <p className="text-(--news-description) text-[14px]">@bob</p>
              </div>
            </div>
          </div>
          <div className="h-22 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex justify-center items-center">
            <div className="w-[85%] h-15 flex flex-col justify-center gap-2">
              <div>امتیاز کاربران</div>
              <div className="flex items-center justify-between">
                <Rating
                  style={{ direction: "ltr" }}
                  className="h-8 max-w-40 xs:max-w-20 md:max-w-30 lg:max-w-35 gap-2"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#EAEAEA",
                  }}
                  value={usersRate?.avg}
                  readOnly
                />
                <div className="text-[15px] md:text-[16px]">
                  {usersRate?.avg.toFixed(2)} امتیاز
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] lg:w-[70%]">
          <div className="w-full mt-3 pb-10 flex flex-col justify-center gap-4 ">
            <p className="font-bold! text-[24px] text-center lg:text-start lg:mr-8">
              توضیحات
            </p>
            <h2 className="p-5 rounded-3xl font-semibold! text-[15px] text-(--news-description) bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]">
              {item?.describe}
            </h2>
          </div>
          <Comment newsId={id} />
        </div>
        <div className="w-[90%] lg:w-[25%] flex flex-col gap-5"></div>
      </div>
    </div>
  );
};

export default NewsDetails;
