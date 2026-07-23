import React, { useState, useEffect, useMemo } from "react";
import styles from "../styles/News.module.css";
import NewsFilter from "../components/NewsContainer/NewsFilter";
import NewsData from "../components/NewsContainer/NewsData";
import clsx from "clsx";
import ReactPaginate from "react-paginate";
import { getNewsList } from "../core/services/newsService/newsService";
import { toast } from "react-toastify";

const News = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [showType, setShowType] = useState("grid");

  const [newsItems, setNewsItems] = useState([]);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 9;

  const currentItems = newsItems;

  const fetchNews = async (pageNumber = 1) => {
    try {
      const response = await getNewsList({pageNumber , rowsOfPage : perPage});
      console.log("resp",response);
      
      if(response.data?.news){
        setNewsItems(response.data.news);
        setPageCount(Math.ceil(response.data.totalCount / perPage));
      }
    } catch (error) {
      console.log("Fetch-News-Error",error);
      toast.error("خطا در بارگذاری مقالات");
    }
  };

  const handlePageClick = async (event) => {
    const page = event.selected + 1;

    setPageIndex(event.selected);

    await fetchNews(page);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews();
  }, []);
  

  const categories = useMemo(() => {
    return [...new Set(newsItems.map((item) => item.newsCatregoryName))];
  }, [newsItems]);

  return (
    <div className={styles.whole_box}>
      <div className={styles.title_box}>
        <div className="flex flex-col gap-4 items-center lg:w-[50%] xl:w-[40%] lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
          <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-bold!">
            آموزش برنامه‌نویسی با بهترین‌ها
          </h1>
          <p className="flex items-center text-center lg:text-[16px] sm:text-[14px] text-[10px] w-[80%] xl:w-fit text-(--news-description)">
            آموزش برنامه نويسى يكى از دورههاى محبوب در حوزه فناورى اطلاعات است.
            برنامه نويسى مهارتى است كه به افراد امكان مى دهد تا نرم افزارهاى
            كامپيوترى را ايجاد و توسعه دهند.
          </p>
        </div>
        <div className="w-100 lg:w-[50%] xl:w-150">
          <img src="/images/courseBanner.png" />
        </div>
      </div>
      <div className={styles.data_container}>
        <NewsFilter categories={categories} />

        <div className="w-full sm:w-[95%] lg:w-[72.5%] h-auto flex flex-col items-center gap-8">
          <div className="w-full h-12 flex flex-row gap-2 items-center justify-around">
            <div className="relative w-24 h-full rounded-2xl hidden md:flex flex-row items-center justify-center gap-2 bg-(--news-top-filter)">
              <div
                className={clsx(
                  "absolute h-10 w-10 rounded-2xl bg-(--news-show-icons) duration-300",
                  showType === "grid" ? "right-1" : "right-13",
                )}
              ></div>
              <div
                onClick={() => setShowType("grid")}
                className="h-10 w-10 bg-[url(/images/grid.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color) cursor-pointer"
              ></div>
              <div
                onClick={() => setShowType("list")}
                className="h-10 w-10 bg-[url(/images/list.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color) cursor-pointer"
              ></div>
            </div>
            <input
              type="text"
              placeholder="متن ورودی"
              className="flex-1 min-w-0 h-full rounded-xl bg-[url(/images/search.png)] bg-no-repeat bg-position-[97%_50%] bg-(--news-top-filter) indent-12 2xl:indent-16"
            />
            <div className="w-fit h-full pr-2 pl-2 rounded-2xl hidden lg:flex flex-row items-center justify-around gap-2 bg-(--news-top-filter)  cursor-pointer">
              <div className="w-7 h-9 bg-[url(/images/listsort.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
              <p>محبوب‌ترین‌ها</p>
              <div className="w-4 h-5 bg-[url(/images/arrow.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
            </div>
            <div className="h-full pr-4 pl-4 rounded-xl flex lg:hidden items-center text-sm font-semibold! bg-[#0CBDE2] cursor-pointer">
              ترتیب و فیلتر
            </div>
          </div>
          <div className="w-full h-fit mt-6 flex flex-row flex-wrap justify-around gap-2 gap-y-8">
            {currentItems.map((item) => (
              <NewsData key={item.id} {...item} showType={showType} />
            ))}
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            forcePage={pageIndex}
            onPageChange={handlePageClick}
            containerClassName={"h-12 px-2 rounded-2xl flex flex-row gap-1 items-center text-2xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]"}
            pageClassName={"h-full w-12 content-center text-center text-(--text-color) text-[18px] cursor-pointer"}
            pageLinkClassName="block"
            previousLinkClassName="block"
            nextLinkClassName="block"
            activeClassName={"text-white rounded-lg bg-(--button-bg) cursor-none"}
            previousClassName={"mx-3 cursor-pointer"}
            nextClassName={"mx-3 cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
};

export default News;
