import React, { useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { getNewsComment } from "../../../core/services/newsService/newsService";
import { toast } from "react-toastify";

const StudentComment = () => {
  const [comment, setComment] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await getNewsComment();
      console.log("student comment: ", response.data);
      setComment(response.data);
    } catch (error) {
      console.log(error);
      toast.error("خطا در بارگذاری کامنت ها");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const visibleIndexes = comment.length
    ? [
        {
          index: (activeBoxIndex + 2) % comment.length,
          pos: "righter",
        },
        {
          index: (activeBoxIndex + 1) % comment.length,
          pos: "right",
        },
        { index: activeBoxIndex, pos: "center" },
        {
          index: (activeBoxIndex - 1 + comment.length) % comment.length,
          pos: "left",
        },
        {
          index: (activeBoxIndex - 2 + comment.length) % comment.length,
          pos: "lefter",
        },
      ]
    : [];

  useEffect(() => {
    if (!comment.length) return;

    const interval = setInterval(() => {
      setActiveBoxIndex((prev) => (prev + 1) % comment.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comment.length]);

  return (
    <div className="h-167.5 w-[90%] hidden md:flex flex-row items-center justify-between">
      <div className="h-[70%] w-[38%] flex flex-col justify-center gap-8">
        <p className="text-(--button-bg) font-semibold! text-xl">
          نظرات دانشجویان
        </p>
        <h1 className="font-black text-3xl">
          برای مزایا به برنامه آموزشی هوشمند دسترسی پیدا کنید.
        </h1>
        <h3 className="text-(--news-description) font-semibold!">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است.
        </h3>
        <div className="mt-10 flex flex-row justify-between items-center">
          <p className="font-bold! text-3xl">5</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-row">
              <div className="h-13.75 w-13.75 rounded-full bg-(--button-bg) content-center text-center font-bold! border-2 border-white -ml-5 z-10004">
                +{comment.length - 3}
              </div>
              <img
                style={{ height: "55px", width: "55px" }}
                className="rounded-full border-2 border-white -ml-5 z-10003"
                src={comment[1]?.user?.currentPictureAddress}
              />
              <img
                style={{ height: "55px", width: "55px" }}
                className="rounded-full border-2 border-white -ml-5 z-10002"
                src={comment[3]?.user?.currentPictureAddress}
              />
              <img
                style={{ height: "55px", width: "55px" }}
                className="rounded-full border-2 border-white z-10001"
                src={comment[2]?.user?.currentPictureAddress}
              />
            </div>
            <Rating
              style={{ direction: "ltr" }}
              className="h-8 max-w-40 xs:max-w-20 md:max-w-30 lg:max-w-35 gap-2"
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: "var(--button-bg)",
                inactiveFillColor: "#EAEAEA",
              }}
              value={5}
              readOnly
            />
          </div>
        </div>
      </div>
      <div
        className="h-[80%] w-[58%] flex justify-center items-center overflow-hidden
        [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
        lg:[-webkit-mask-image:linear-gradient(to_left,transparent,black_20%,black_80%,transparent)]"
      >
        <div className="h-full w-582 xl:w-710 hidden md:flex flex-col lg:flex-row justify-center items-center">
          {visibleIndexes.map((item) => {
            const currentComment = comment?.[item.index];
            return (
              <motion.div
                key={item.index}
                layout
                transition={{
                  layout: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
                className={
                  item.pos === "righter"
                    ? "h-100 lg:h-full w-full lg:w-122 scale-90 px-7 py-5 -mb-5 lg:mb-0 ml-0 lg:-ml-6 rounded-2xl flex flex-col justify-around gap-12 bg-(--student-comment-box-bg) shadow-[0_0px_8px_var(--news-shadow-color)]"
                    : item.pos === "right"
                      ? "h-100 lg:h-full w-full lg:w-122 scale-90 px-7 py-5 -mb-5 lg:mb-0 ml-0 lg:-ml-6 rounded-2xl flex flex-col justify-around gap-12 bg-(--student-comment-box-bg) shadow-[0_0px_8px_var(--news-shadow-color)]"
                      : item.pos === "center"
                        ? "h-100 lg:h-full w-full lg:w-122 px-7 py-5 -my-7 lg:my-0 mx-0 lg:-mx-11 rounded-2xl flex flex-col justify-around gap-12 bg-(--student-comment-box-bg) shadow-[0_0px_8px_var(--news-shadow-color)] z-12222"
                        : item.pos === "left"
                          ? "h-100 lg:h-full w-full lg:w-122 scale-90 px-7 py-5 -mt-5 lg:mt-0 mr-0 lg:-mr-6 rounded-2xl flex flex-col justify-around gap-12 bg-(--student-comment-box-bg) shadow-[0_0px_8px_var(--news-shadow-color)]"
                          : item.pos === "lefter"
                            ? "h-100 lg:h-full w-full lg:w-122 scale-90 px-7 py-5 -mt-5 lg:mt-0 mr-0 lg:-mr-6 rounded-2xl flex flex-col justify-around gap-12 bg-(--student-comment-box-bg) shadow-[0_0px_8px_var(--news-shadow-color)]"
                            : "hidden"
                }
              >
                <Rating
                  style={{ direction: "ltr" }}
                  className="h-8 max-w-35 gap-2"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "var(--button-bg)",
                    inactiveFillColor: "#EAEAEA",
                  }}
                  value={5}
                  readOnly
                />
                <h2 className="font-semibold! text-xl">
                  {currentComment?.describe}
                </h2>
                <div className="w-[85%] flex flex-row items-center gap-3">
                  <img
                    style={{
                      height: "64px",
                      width: "64px",
                      borderRadius: "100%",
                    }}
                    src={currentComment?.user?.currentPictureAddress || "/images/drTenma.jpg"}
                    onError={(e) => {e.target.src = "/images/drTenma.jpg";}}
                  />
                  <div className="flex flex-col gap-1">
                    <p>{currentComment?.userFullName}</p>
                    <p className="text-(--news-description) text-[14px]">
                      {currentComment?.user?.userName}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentComment;
