import React, { useState, useEffect, useCallback, useRef } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import Comment from "./Comment";
import clsx from "clsx";
import { toast } from "react-toastify";
import {
  addNewsDisLike,
  addNewsFavorite,
  addNewsLike,
  deleteFavoriteNews,
  getFavoriteNews,
  getNewsDetails,
} from "../../core/services/newsService/newsService";
import { toShamsiDate } from "../../utils/dateFormatter";

const NewsDetails = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const { id } = useParams();
  const [fav, setFav] = useState();
  const [favouredList, setFavouredList] = useState([]);
  const [item, setItem] = useState([]);
  const [usersRate, setUsersRate] = useState(null);

  const fetchItem = async () => {
    try {
      const response = await getNewsDetails(id);
      console.log("Detail =", response.data);
      setItem(response.data.detailsNewsDto);
      setUsersRate(response.data.detailsNewsDto.newsRate);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("خطا در دریافت اطلاعات مقاله");
    }
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchFavoriteBlogs = useCallback(async () => {
    try {
      const response = await getFavoriteNews();
      console.log(response);
      console.log(response.data);

      if (response.data?.myFavoriteNews) {
        setFavouredList(response.data?.myFavoriteNews);
        console.log("Data Received", response.data.myFavoriteNews);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error("در نمایش مقالات مورد علاقه شما خطایی رخ داد");
    }
  }, []);

  useEffect(() => {
    fetchFavoriteBlogs();
  }, []);

  useEffect(() => {
    const isFavorite = favouredList.some((item) => item.newsId === id);

    setFav(isFavorite);
  }, [favouredList, id]);

  const [hasMore, setHasMore] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const lines = el.scrollHeight / lineHeight;

    setHasMore(lines > 20);
  }, [item?.describe]);

  const addFavorite = async () => {
    const favoriteStatus = favouredList.find((item) => item.newsId === id);

    if (!favoriteStatus) {
      try {
        const response = await addNewsFavorite(id);
        console.log("Favorite Response =", response);

        toast.success("مقاله به علاقه مندی ها افزوده شد");

        await fetchFavoriteBlogs();
        setFav(true);
      } catch (error) {
        console.log(error.response?.data);
        toast.error("در افزودن مقاله به علاقه مندی ها خطایی رخ داد");
      }
    } else {
      try {
        console.log("favoriteStatus:", favoriteStatus);
        console.log("favoriteId:", favoriteStatus.favoriteId);
        await deleteFavoriteNews(favoriteStatus.favoriteId);

        toast.success("مقاله از علاقه مندی ها حذف شد");

        await fetchFavoriteBlogs();
        setFav(false);
      } catch (error) {
        console.log(error);
        toast.error("در حذف مقاله از علاقه مندی ها خطایی رخ داد");
      }
    }
  };

  const handleLike = async () => {
    try {
      await addNewsLike(id);
      toast.success("لایک ثبت شد");

      await fetchItem();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "خطایی رخ داد");
    }
  };

  const handleDisLike = async () => {
    try {
      await addNewsDisLike(id);
      toast.success("دیسلایک ثبت شد");

      await fetchItem();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "خطایی رخ داد");
    }
  };

  return (
    <div className="w-full mt-10 mb-10 flex justify-center">
      <div className="w-[97%] md:w-[90%] flex flex-row flex-wrap justify-around">
        <div className="w-[90%] lg:w-[70%]">
          <div className="w-full flex justify-center">
            <div className="w-full flex justify-center relative">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "950/617",
                  maxHeight: "617px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  src={item?.currentImageAddress || "/images/PythonVeryBig.jpg"}
                  onError={(e) => {
                    e.target.src = "/images/PythonBig.png";
                  }}
                />
              </div>
              <div className="p-1 flex flex-row items-center gap-5 rounded-tr-3xl bg-(--bg-color) absolute bottom-0 left-0">
                <div
                  className="flex flex-row items-center"
                  onClick={() => handleLike()}
                >
                  <div className="h-10 w-10 bg-[url(/images/like.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.currentLikeCount}</div>
                </div>
                <div
                  className="flex flex-row items-center"
                  onClick={() => handleDisLike()}
                >
                  <div className="h-10 w-10 bg-[url(/images/disslike.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.currentDissLikeCount}</div>
                </div>
              </div>
              <div
                onClick={() => {
                  addFavorite();
                }}
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
                {item?.miniDescribe}
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
              <div>{toShamsiDate(item?.insertDate)}</div>
            </div>
          </div>
          <div className="h-20 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex justify-center items-center">
            <div className="w-[85%] flex flex-row items-center gap-2">
              <img
                style={{ height: "64px", width: "64px", borderRadius: "100%" }}
                src={item?.addUserProfileImage || "/images/bob.png"}
                onError={(e) => {
                  e.target.src = "/images/bob.png";
                }}
              />
              <div className="flex flex-col gap-1">
                <p>{item?.addUserFullName || "اسم ناشر"}</p>
                <p className="text-(--news-description) text-[14px]">
                  @userName
                </p>
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
            <div className="relative transition-all">
              <h2
                ref={textRef}
                className={`px-8 py-5 rounded-3xl font-semibold! text-[17px] text-(--news-description) bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]
              ${
                hasMore &&
                (showMore
                  ? "max-h-fit pb-20"
                  : "max-h-150 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:20] [-webkit-box-orient:vertical] mask-[linear-gradient(to_bottom,black_75%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent)]")
              }`}
              >
                {item?.describe}
              </h2>

              {hasMore && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`px-5 py-2 absolute left-[43%] rounded-xl transition-all duration-300 cursor-pointer
              ${
                showMore
                  ? "text-white font-semibold! bg-(--button-bg) hover:bg-(--button-hover) bottom-5"
                  : "border border-(--button-bg) text-(--button-bg) hover:bg-(--button-hover-transparent) bottom-0"
              }`}
                >
                  {showMore ? "بستن توضیحات" : "نمایش بیشتر"}
                </button>
              )}
            </div>
          </div>
          <Comment newsId={id} />
        </div>
        <div className="w-[90%] lg:w-[25%] flex flex-col gap-5"></div>
      </div>
    </div>
  );
};

export default NewsDetails;
