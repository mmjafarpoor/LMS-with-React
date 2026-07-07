import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const WagonSlider = () => {
  const items = [
    "js",
    "pyton",
    "react",
    "next",
    "c++",
    "c#",
    "godot",
    "unreal engine",
    "unity",
    "git",
  ];

  const sliderLength = items.length * 180 + items.length * 12;

  return (
    <div className="w-full flex flex-col items-center justify-between gap-10">
      <div className="flex flex-col gap-6 items-center lg:bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
        <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-semibold!">
          محبوب‌ترین دسته‌بندی‌ها
        </h1>
        <p className="flex items-center text-center lg:text-[16px] sm:text-[14px] text-[10px] w-[80%] xl:w-fit text-(--news-description)">
          محبوب ترین دوره های آموزشی نویسندگان متخصص ما را بررسی کنید.
        </p>
      </div>
      <div className="h-30 w-full -rotate-4 overflow-hidden">
        <motion.div
          animate={{
            x: [0, `${sliderLength}px`],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-[50%] max-w-fit flex flex-row items-center justify-start gap-3"
        >
          {[...items, ...items].map((item) => (
            <div className="relative w-45 h-[80%] rounded-4xl bg-(--news-top-filter) flex items-center shrink-0 justify-center font-semibold! cursor-pointer">
              {item}
              <div className="absolute -right-1 top-3.5 h-10 w-10 bg-[url(/images/api.svg)] bg-no-repeat rotate-6"></div>
              <div className="absolute left-2.5 top-3.5 h-10 w-10 bg-[url(/images/arrowLeftWithCircle.svg)] bg-no-repeat rotate-6"></div>
            </div>
          ))}
        </motion.div>
        <motion.div
          animate={{
            x: [0, `${sliderLength}px`],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-[50%] max-w-fit -mr-24 flex flex-row items-center justify-start gap-3"
        >
          {[...items, ...items].map((item) => (
            <div className="relative w-45 h-[80%] rounded-4xl bg-(--news-top-filter) flex items-center shrink-0 justify-center font-semibold! cursor-pointer">
              {item}
              <div className="absolute -right-1 top-3.5 h-10 w-10 bg-[url(/images/api.svg)] bg-no-repeat rotate-6"></div>
              <div className="absolute left-2.5 top-3.5 h-10 w-10 bg-[url(/images/arrowLeftWithCircle.svg)] bg-no-repeat rotate-6"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WagonSlider;
