import React from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundArrow, NotFoundBg } from "@/assets/Gallery";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full h-140 flex justify-center sm:min-h-[calc(100dvh-120px)] mb-1.5 sm:mb-3 bg-no-repeat bg-center bg-cover xl:mb-4 xl:min-h-0 xl:h-auto xl:aspect-1920/825"
            style={{ backgroundImage: `url(${NotFoundBg})` }}
        >
            <div className="mt-17.5 sm:mt-25 flex flex-col items-center gap-5">
                <span className="text-(--button-bg) font-extrabold select-none whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-(--button-hover) max-h-39 sm:max-h-46 lg:max-h-60 text-[10rem] sm:text-[12rem] lg:text-[15rem]">
                    404
                </span>
                <span className="font-black text-[1.55rem] lg:text-[1.8rem] select-none whitespace-nowrap">
                    مشکلی پیش امده
                </span>
                <button
                    className="w-47.5 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--button-bg) bg-(--button-bg) hover:bg-(--button-hover) rounded-[18px] flex items-center justify-evenly cursor-pointer transition-colors duration-300 ease-in-out"
                    onClick={() => navigate(-1)}
                >
                    <span className="font-black text-[0.95rem] text-white select-none whitespace-nowrap">
                        بازگشت به صفحه قبلی
                    </span>
                    <img
                        src={NotFoundArrow}
                        alt="Back To Last Page Arrow"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    );
};

export default NotFound;
