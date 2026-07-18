import React, { useState, useEffect, useCallback } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import Comment from "../../NewsContainer/Comment";
import clsx from "clsx";
import { addCourseDisLike, addCourseFavorite, addCourseLike, addCourseReserve, getCourseDetail } from "../../../core/services/coursesService/coursesService";
import { toast } from "react-toastify";
import { deleteFavoriteCourse, getFavoriteCourse } from "../../../core/services/dashBoardService/dashBoardApi";
import { toShamsiDate } from "../../../utils/dateFormatter";

const NewsDetails = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const { courseId } = useParams();
  const [fav, setFav] = useState();
  const [item, setItem] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  const fetchItem = async () => {
    try {
      const response = await getCourseDetail(courseId);
      console.log("Detail =",response.data);
      setItem(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      const errorMsg = error.message || "خطا در بارگذاری لیست دوره‌ها";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);


  const fetchFavoriteCourses = useCallback(async() => {
    try {
        const response = await getFavoriteCourse();
        console.log(response);
        console.log(response.data);
        if (response.data?.favoriteCourseDto) {
            setFavoriteList(response.data.favoriteCourseDto);
            console.log("Data Received",response.data.favoriteCourseDto);
        }
    } catch (error) {
        console.log(error.response?.data);
        toast.error("در نمایش دوره های مورد علاقه شما خطایی رخ داد");
    }
  },[])
  useEffect(() => {
    fetchFavoriteCourses();
  }, []);

  useEffect(() => {
    const isFavorite = favoriteList.some(
      item => item.courseId === courseId
    );

    setFav(isFavorite);
  }, [favoriteList, courseId]);
  

  const addFavorite = async() => {
    const favoriteStatus = favoriteList.find(item => item.courseId === courseId);
    if(!favoriteStatus){
        try {
        const response = await addCourseFavorite({courseId: courseId,});
        console.log("Favorite Response =",response);

        toast.success("دوره به علاقه مندی ها افزوده شد");
      } catch (error) {
        console.log(error.response?.data);
        toast.error("در افزودن دوره به علاقه مندی ها خطایی رخ داد");
      }
    await fetchFavoriteCourses();
    setFav(true);
    }
    else{
      try {
        await deleteFavoriteCourse(favoriteStatus.favoriteId);
        toast.success("دوره از علاقه مندی ها حذف شد");
      } catch (error) {
        console.log(error);
        toast.error("در حذف دوره از علاقه مندی ها خطایی رخ داد");
      }
      await fetchFavoriteCourses();
      setFav(false);
    }
  }

  const handleLike = async () => {
    try {
      await addCourseLike(courseId);
      toast.success("لایک ثبت شد");

      await fetchItem();
    }
    catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "خطایی رخ داد");
    }
  };

  const handleDisLike = async () => {
    try {    
      await addCourseDisLike(courseId);
      toast.success("دیسلایک ثبت شد");
      await fetchItem();
    } 
    catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "خطایی رخ داد");
    }
  };

  const addReserve = async (courseId) => {
    try {
      await addCourseReserve(courseId);
      toast.success("دوره شما با موفقیت رزرو شد");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("در رزرو کردن دوره خطایی رخ داد");
    }
  }

  return (
    <div className="w-full mt-10 mb-10 flex justify-center">
      <div className="w-[97%] md:w-[90%] flex flex-row flex-wrap justify-around">
        <div className="w-[90%] lg:w-[70%]">
          <div className="w-full flex justify-center">
            <div className="w-fit flex justify-center relative">
              <img
                style={{ width: "950px", borderRadius: "24px" }}
                src={item?.imageAddress || "/images/JSBig.jpg"}
                onError={(e) => {e.target.src = "/images/javaScriptProductCard.png";}}
              />
              <div className="p-1 flex flex-row items-center gap-5 rounded-tr-3xl bg-(--bg-color) absolute bottom-0 left-0">
                <div className="flex flex-row items-center" onClick={() => handleLike()}>
                  <div className="h-10 w-10 bg-[url(/public/images/like.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.likeCount}</div>
                </div>
                <div className="flex flex-row items-center" onClick={() => handleDisLike()}>
                  <div className="h-10 w-10 bg-[url(/public/images/disslike.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  <div className="font-bold!">{item?.dissLikeCount}</div>
                </div>
              </div>
              <div
                onClick={() => {addFavorite()}}
                className={clsx(
                  "absolute -right-58 -bottom-59 h-100 w-100 scale-45 sm:-right-77 sm:-bottom-77 sm:h-120 sm:w-120 sm:scale-60 cursor-pointer transition-all duration-500",
                  fav ? "bg-red-700" : "bg-(--input-bg) shadow-[0_0px_8px_var(--news-shadow-color)]",
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
            <p className="mb-5 text-[30px] font-semibold!">{item?.title}</p>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/public/images/watch.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">دانشجویان</p>
              </div>
              <div>{item?.studentCount}</div>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/public/images/watch.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">وضعیت</p>
              </div>
              <div>{item?.statusName}</div>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/public/images/calendar-start.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">شروع</p>
              </div>
              <div>{toShamsiDate(item?.startTime)}</div>
            </div>
            <div className="h-12 w-[85%] flex items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row gap-2">
                <div className="h-6.5 w-6 bg-[url(/public/images/calendar-start.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                <p className="text-(--news-description)">پایان</p>
              </div>
              <div>{toShamsiDate(item?.endTime)}</div>
            </div>
            <div className="mt-4 h-12 w-[85%] flex flex-row items-center justify-between">
              <button onClick={() => addReserve(item?.courseId)} className="py-2.5 px-6.5 lg:px-2.5 rounded-3xl bg-(--button-bg) hover:bg-(--button-hover) font-semibold! cursor-pointer transition-all duration-300 ease-in-out">
                شروع یادگیری
              </button>
              <p>
                <span className="text-(--button-bg) font-semibold!">
                  {item?.cost} هزار
                </span>{" "}
                تومان
              </p>
            </div>
          </div>
          <div className="h-20 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex justify-center items-center">
            <div className="w-[85%] flex flex-row items-center gap-2">
              <img
                style={{ height: "64px", borderRadius: "100%" }}
                src="/images/MaxPayne1.png"
              />
              <div className="flex flex-col gap-1">
                <p>{item?.teacherName}</p>
                <p className="text-(--news-description) text-[14px]">
                  {item?.teacherName}@
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
                  value={item?.courseRate}
                  readOnly
                />
                <div className="text-[15px] md:text-[16px]">
                  {item?.courseRate.toFixed(2)} امتیاز
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
          <Comment courseId={courseId} />
        </div>
        <div className="w-[90%] lg:w-[25%] flex flex-col gap-5"></div>
      </div>
    </div>
  );
};

export default NewsDetails;
