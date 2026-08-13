import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewsList } from "../../../core/services/newsService/newsService";
import { NewsFallBack } from "@/assets/Gallery";

const NewsCards = () => {
  const [newsItems, setNewsItems] = useState([]);
  // const currentItems = newsItems.slice(0, 3);

  const fetchNews = async () => {
    const response = await getNewsList({ pageNumber: 1, rowsOfPage: 3 });
    console.log("Latest News =", response.data);
    setNewsItems(response.data.news);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews();
  }, []);

  const navigate = useNavigate();
  const GoToNewsDetails = (item) => {
    navigate(`/News/${item.id}/${item.googleTitle.replaceAll(" ", "-")}`);
  };
  const GoToNewsPage = () => {
    navigate("/News");
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-6 items-center lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
        <h1 className="lg:text-[34px] sm:text-[26px] text-[20px] font-black">
          جدیدترین اخبار
        </h1>
        <p className="flex items-center text-center font-semibold lg:text-[16px] sm:text-[14px] text-[10px] w-fit text-(--news-description)">
          محبوب ترین دوره های آموزشی نویسندگان متخصص ما را بررسی کنید.
        </p>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-center gap-5">
        {newsItems.map((item) => (
          <div
            onClick={() => GoToNewsDetails(item)}
            className="rounded-3xl overflow-hidden cursor-pointer relative w-80 md:w-125 xl:w-78.75 md:hover:w-135 xl:hover:w-110 h-105 sm:h-122.5 transition-all duration-250"
          >
            <img
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                position: "absolute",
              }}
              src={item?.currentImageAddress || NewsFallBack}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.target.src = NewsFallBack;
              }}
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/25 to-transparent pointer-events-none">
              {/* content */}
              <div className="w-full px-5 flex flex-col gap-2 absolute bottom-4 text-white z-10">
                <p className="text-2xl font-black truncate drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  {item?.title || "عنوان مقاله"}
                </p>
                <h2 className="max-h-20 text-md font-black overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {item?.miniDescribe || item?.googleDescribe || "شرح مقاله"}
                </h2>
                <div className="mt-2 flex flex-row justify-between text-sm font-bold!">
                  <div className="h-6 bg-[url(/images/whiteUser.png)] bg-no-repeat bg-position-[100%_0%] indent-8 text-white font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {item?.currentView} بازدید
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center">
                      <div className="h-6 w-10 mb-2.5 bg-[url(/images/thumbs-up.svg)] bg-no-repeat bg-position-[50%] invert-100"></div>
                      <div className="font-bold! drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {item?.currentLikeCount || 0}
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="h-6 w-10 mt-1.5 bg-[url(/images/thumbs-down.svg)] bg-no-repeat bg-position-[50%] -scale-x-100 invert-100"></div>
                      <div className="font-bold! drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {item?.currentDissLikeCount || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        onClick={GoToNewsPage}
        className="px-5 py-4 bg-(--button-bg) rounded-4xl font-semibold! cursor-pointer transition-colors duration-300 text-white hover:bg-(--button-hover)"
      >
        دوست داری بیشتر ببینی؟
      </p>
    </div>
  );
};

export default NewsCards;
