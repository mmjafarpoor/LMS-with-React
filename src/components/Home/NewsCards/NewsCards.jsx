import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsCards = () => {
  const [newsItems, setNewsItems] = useState([]);
  const currentItems = newsItems.slice(0, 3);
  const fetchNews = async () => {
    const response = await fetch("http://188.121.104.25:3001/News");
    const data = await response.json();
    setNewsItems(data.news);
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
        <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-semibold!">
          جدیدترین اخبار
        </h1>
        <p className="flex items-center text-center lg:text-[16px] sm:text-[14px] text-[10px] w-fit text-(--news-description)">
          محبوب ترین دوره های آموزشی نویسندگان متخصص ما را بررسی کنید.
        </p>
      </div>
      <div className="w-full flex flex-row flex-wrap justify-center gap-5">
        {currentItems.map((item) => (
          <div
            onClick={() => GoToNewsDetails(item)}
            className="rounded-3xl overflow-hidden cursor-pointer relative w-110 md:w-125 xl:w-78.75 hover:w-150 md:hover:w-135 xl:hover:w-110  h-122.5 transition-all duration-250"
          >
            <img
              style={{
                maxWidth: "none",
                position: "absolute",
                height: "490px",
              }}
              src="/images/PythonBig.png"
            />
            <div className="w-[80%] mr-6 flex flex-col gap-2 absolute bottom-4 text-white">
              <p className="text-2xl font-semibold!">{item?.title}</p>
              <h2 className="text-md font-semibold!">{item?.describe} </h2>
              <div className="mt-2 flex flex-row gap-10 text-sm font-bold!">
                <div className="h-6 bg-[url(/images/whiteUser.png)] bg-no-repeat bg-position-[100%_0%] indent-8 text-white font-semibold!">
                  {item?.currentView} بازدید
                </div>
                <div className="h-6 bg-[url(/images/book.png)] bg-no-repeat bg-position-[100%_0%] indent-12 text-white font-semibold!">
                  دروس
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        onClick={GoToNewsPage}
        className="px-5 py-4 bg-(--button-bg) rounded-4xl font-semibold! cursor-pointer"
      >
        دوست داری بیشتر ببینی؟
      </p>
    </div>
  );
};

export default NewsCards;
