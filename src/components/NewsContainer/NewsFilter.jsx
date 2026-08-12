import clsx from "clsx";
import React, { useState } from "react";

const NewsFilters = ({categories}) => {
  const [activeFilter, setActiveFilter] = useState({});
  
  const toggleFilter = (category) => {
    setActiveFilter(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // console.log(categories);
  // console.log(activeFilter)

  return (
    <div className="sticky top-7 w-[25%] pt-5 pb-5 h-fit hidden lg:flex flex-col gap-4 items-center justify-center rounded-2xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]">
      <div className="w-[90%] h-10 content-center relative">
        دسته‌بندی‌ها
        <div className="w-4 h-5 content-center bg-[url(/images/arrow.png)] bg-no-repeat bg-position-[50%] invert-(--invert-color) absolute left-2 top-2.5"></div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <input
          className="w-[92%] h-10 rounded-xl bg-[url(/images/search.png)] bg-no-repeat bg-position-[97%_50%] bg-(--input-bg) indent-10 2xl:indent-[12%] outline-none"
          type="text"
          placeholder="جست‌وجو در فیلتر"
        />
        {categories.map((category) => (
          <div
            key={category}
            className="w-[90%] flex flex-row gap-2 items-center"
          >
            <div
              onClick={() => toggleFilter(category)}
              className={clsx(
                "h-4.5 w-4.5 rounded-md duration-50 cursor-pointer",
                activeFilter[category]
                  ? "bg-[url(/images/check.png)] bg-no-repeat bg-position-[50%_55%] bg-[#ECFDEF] border border-[#3DCAE8]"
                  : "bg-[#E7F8FC] border border-[#A6A6A6]",
              )}
            ></div>
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFilters;
