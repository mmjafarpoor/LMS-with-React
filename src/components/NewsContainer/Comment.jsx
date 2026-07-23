import { Formik, Form, Field } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";
import {addNewsComment, addNewsLikeComment , getNewsComment, getNewsCommentReply} from "../../core/services/newsService/newsService";
import {addCourseComment , addDisLikeComment , addLikeComment , getCourseComment} from "../../core/services/coursesService/coursesService";
import { toast } from "react-toastify";
import clsx from "clsx";
import { toShamsiDate } from "../../utils/dateFormatter";

const Comment = ({ newsId, courseId }) => {
  const ItemId = newsId ?? courseId;

  const [commentModalActive, isCommentModalActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState([]);
  const [showMore, setShowMore] = useState(2);
  const [openedReplyId, setOpenedReplyId] = useState(null);

  const mainComment = comments
    .filter((comment) => comment.parentId === "")
    .slice(0, showMore);

  const replyComment = (id) =>
    comments.filter((reply) => reply.parentId === id);

  const fetchItem = async () => {
    try {
      if (ItemId == newsId) {
        const response = await getNewsComment({ NewsId: ItemId });
        console.log("News Comments =", response.data);
        setComments(response.data);
      }
      if (ItemId == courseId) {
        const courseComment = await getCourseComment(courseId);
        console.log("Course Comments =", courseComment.data);
        setComments(courseComment.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("در بارگیری نظرات خطایی رخ داد");
    }
  };

  const fetchReply = async () => {
    try {
      if (ItemId == newsId) {
        const response = await getNewsCommentReply();
        console.log("News Reply =",response.data);
        setReply(response.data);
      }
      if (ItemId == courseId) {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("در بارگیری پاسخ نظرات خطایی رخ داد");
    }
  }

  useEffect(() => {
    fetchItem();
    fetchReply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemId]);

  const handleLike = async (commentId) => {
    try {
      if (ItemId == courseId) {
        await addLikeComment(commentId);
      }
      if (ItemId == newsId) {
        await addNewsLikeComment(commentId, true);
      }
      toast.success("لایک ثبت شد");
      await fetchItem();
    } catch (error) {
      console.log(error);
      toast.error("ثبت لایک با خطایی مواجه شد");
    }
  };

  const handleDisLike = async (commentId) => {
    try {
      if (ItemId == courseId) {
        await addDisLikeComment(commentId);
      }
      if (ItemId == newsId) {
        await addNewsLikeComment(commentId, false);
      }
      toast.success("دیسلایک ثبت شد");
      await fetchItem();
    } catch (error) {
      console.log(error);
      toast.error("ثبت دیسلایک با خطایی مواجه شد");
    }
  };
  // const replyModalAnimation = {
  //   initial: {
  //     height: 0,
  //   },
  //   animate: {
  //     height: "100%",
  //   },
  //   exit: {
  //     height: 0,
  //   },
  // };

  return (
    <div className="w-full flex flex-col items-center gap-5 mb-5">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold! text-[24px]">نظرات</p>
        <button
          onClick={() => {
            isCommentModalActive(!commentModalActive);
          }}
          className="w-50 p-3 pr-14 rounded-2xl font-semibold! text-[16px] text-white bg-[url(/images/addComment.png)] bg-no-repeat bg-position-[90%_50%] bg-(--button-bg) hover:bg-(--button-hover) cursor-pointer transition-all duration-300 ease-in-out"
        >
          {commentModalActive ? "بستن ارسال دیدگاه" : "ارسال دیدگاه جدید"}
        </button>
      </div>

      {/* -----------------------------------MAIN-COMMENTS----------------------------------- */}

      <div
        className={`
          relative w-full transition-all duration-500 overflow-hidden flex flex-col justify-around items-center bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]
          ${commentModalActive ? "max-h-500 w-full py-7 rounded-3xl" : "h-0"}`}
      >
        <Formik
          initialValues={{
            commentTitle: "",
            commentDescribe: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (ItemId == newsId) {
                await addNewsComment({
                  newsId: newsId,
                  title: values.commentTitle,
                  describe: values.commentDescribe,
                });
              }
              if (ItemId == courseId) {
                await addCourseComment({
                  courseId: courseId,
                  title: values.commentTitle,
                  describe: values.commentDescribe,
                });
              }
              toast.success("نظر با موفقیت ثبت شد");

              await fetchItem();
              resetForm();
              isCommentModalActive(false);
            } catch (error) {
              console.log(error);
              console.log(error.response?.status);
              console.log(error.response?.data);
              console.log(error.response);
              toast.error("در افزودن نظر خطایی رخ داد");
            }
          }}
        >
          <Form className="w-[92%] flex flex-col gap-2">
            <Field name="commentTitle">
              {({ field }) => (
                <TextareaAutosize
                  {...field}
                  maxRows={1}
                  maxLength={25}
                  placeholder="عنوان دیدگاه خود را وارد کنید"
                  className="w-70 h-fit p-2 rounded-xl bg-(--comment-reply-bg) transition-all resize-none
                  outline-none border border-transparent focus:border-[#0CBDE2]"
                />
              )}
            </Field>
            <Field name="commentDescribe">
              {({ field }) => (
                <TextareaAutosize
                  {...field}
                  minRows={3}
                  maxRows={8}
                  placeholder="دیدگاه خود را وارد کنید"
                  className="w-full p-4 pb-15 rounded-xl bg-(--comment-reply-bg) transition-all resize-none
                  outline-none border border-transparent focus:border-[#0CBDE2]"
                />
              )}
            </Field>

            <button
              type="submit"
              className="absolute right-[5%] bottom-10 h-10 w-40 rounded-xl text-center text-white font-semibold! bg-(--button-bg) hover:bg-(--button-hover) cursor-pointer transition-all duration-300 ease-in-out"
            >
              ثبت و ارسال دیدگاه
            </button>
          </Form>
        </Formik>
      </div>
      {mainComment.map((comment) => (
        // {[
        //   {
        //     id: 1,
        //     pictureAddress:
        //       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Alan_turing_header.jpg/500px-Alan_turing_header.jpg",
        //     user: {
        //       fName: "Alan",
        //       lName: "Turing",
        //       userName: "mahdinoorani@gmail.com",
        //     },
        //     date: "04/07/1403",
        //     describe:
        //       "امروز اینجام تا درمورد بازی آرژانتین و اسپانیا حرف بزنم بازی خیل خوبی بود ",
        //     title: "بازی آرژانتین و اسپانیا",
        //   },
        // ].map((comment) => (
        <div
          key={comment.id}
          className={
            "w-full pt-8 pb-8 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex flex-col items-center justify-center gap-3 transition-all duration-100"
          }
        >
          <div className="w-[90%] flex flex-col gap-4">
            <div className="pb-3 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <img
                  style={{
                    height: "64px",
                    width: "64px",
                    borderRadius: "100%",
                  }}
                  src={comment.pictureAddress || "/images/bob.png"}
                  onError={(e) => {
                    e.target.src = "/images/bob.png";
                  }}
                />
                <div className="flex flex-col gap-1 ">
                  <p className="font-semibold!">
                    {comment?.user?.fName || comment?.author || "نام"} &thinsp;
                    {comment?.user?.lName}
                  </p>
                  <p className="text-(--news-description) text-[12px] sm:text-[14px]">
                    {comment?.user?.userName}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <p className="font-semibold!">
                  {toShamsiDate(comment.insertDate) ||
                    toShamsiDate(comment.inserDate) ||
                    "مدتی پیش"}
                </p>
                <div className="h-5 w-2 bg-[url(/images/3-dots.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
              </div>
            </div>
          </div>
          <p className="w-[90%] mt-2 font-semibold! text-xl text-(--button-bg)">
            {comment?.title}
          </p>
          <p className="w-[90%] pb-3 font-semibold! text-(--news-description) wrap-break-word">
            {comment?.describe}
          </p>
          <div className="w-[90%] flex justify-between items-center">
            <div
              onClick={() =>
                setOpenedReplyId(
                  openedReplyId === comment.id ? null : comment.id,
                )
              }
              className={clsx(
                "relative w-fit h-10 px-4 mt-2 rounded-t-xl flex flex-row items-center gap-1 transition-all duration-1000 cursor-pointer",
                openedReplyId === comment.id
                  ? "bg-(--comment-reply-bg)"
                  : "bg-transparent",
              )}
            >
              <div
                className={clsx(
                  "transition-all w-6 h-6 invert-(--invert-color) flex items-center justify-center bg-no-repeat bg-position-[50%]",
                  openedReplyId === comment.id
                    ? "bg-[url(/images/x.svg)]"
                    : "bg-[url(/images/reply.svg)]",
                )}
              ></div>
              <p className="font-semibold!">پاسخ</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div
                className="flex flex-row items-center"
                onClick={() => handleLike(comment?.id)}
              >
                <div
                  className={
                    clsx(
                      "h-10 w-10 mb-2.5 bg-[url(/images/thumbs-up.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color) cursor-pointer",
                    )
                  }
                ></div>
                <div className="font-bold!">{comment?.likeCount || 0}</div>
              </div>
              <div
                className="flex flex-row items-center"
                onClick={() => handleDisLike(comment?.id)}
              >
                <div className="h-10 w-10 mt-1.5 bg-[url(/images/thumbs-down.svg)] bg-no-repeat bg-position-[50%] -scale-x-100 invert-(--invert-color) cursor-pointer"></div>
                <div className="font-bold!">{comment?.disslikeCount || 0}</div>
              </div>
            </div>
          </div>

          {/* -----------------------------------REPLY-COMMENTS----------------------------------- */}

          <div
            className={`relative w-[90%] -mt-3.5 transition-all duration-500 overflow-hidden flex flex-col gap-4 items-center rounded-l-3xl rounded-b-3xl bg-(--comment-reply-bg)
                ${openedReplyId === comment.id ? "max-h-150 py-7 mb-0" : "h-0 mb-1.5"}`}
          >
            <Formik
              initialValues={{
                commentReplyTitle: "",
                commentReplyDescribe: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  if (ItemId == newsId) {
                    await addNewsComment({
                      newsId: newsId,
                      title: values.commentReplyTitle,
                      describe: values.commentReplyDescribe,
                    });
                  }
                  if (ItemId == courseId) {
                    await addCourseComment({
                      courseId: courseId,
                      title: values.commentReplyTitle,
                      describe: values.commentReplyDescribe,
                    });
                  }
                  toast.success("نظر با موفقیت ثبت شد");

                  await fetchItem();
                  resetForm();
                  isCommentModalActive(false);
                } catch (error) {
                  console.log(error);
                  console.log(error.response?.status);
                  console.log(error.response?.data);
                  console.log(error.response);
                  toast.error("در افزودن نظر خطایی رخ داد");
                }
              }}
            >
              <Form className="w-[92%] flex flex-col gap-2">
                <Field name="commentReplyTitle">
                  {({ field }) => (
                    <TextareaAutosize
                      {...field}
                      maxRows={1}
                      maxLength={25}
                      placeholder="عنوان پاسخ خود را وارد کنید"
                      className="w-60 h-5 p-2 rounded-xl bg-(--news-boxs) transition-all resize-none
                  outline-none border border-transparent focus:border-[#0CBDE2]"
                    />
                  )}
                </Field>
                <Field name="commentReplyDescribe">
                  {({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={2}
                      maxRows={6}
                      placeholder="پاسخ خود را وارد کنید"
                      className="w-full p-4 pb-15 rounded-xl bg-(--news-boxs) transition-all resize-none
                  outline-none border border-transparent focus:border-[#0CBDE2]"
                    />
                  )}
                </Field>

                <button
                  type="submit"
                  className="absolute right-[5%] bottom-9.5 h-9 w-35 rounded-xl text-[15px] text-center text-white font-semibold! bg-(--button-bg) hover:bg-(--button-hover) cursor-pointer transition-all duration-300 ease-in-out"
                >
                  ثبت و ارسال پاسخ
                </button>
              </Form>
            </Formik>
          </div>

          {replyComment(comment.id).map((reply) => (
            // {[
            //   {
            //     id: 1,
            //     pictureAddress:
            //       "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Alan_turing_header.jpg/500px-Alan_turing_header.jpg",
            //     user: {
            //       fName: "Alan",
            //       lName: "Turing",
            //       userName: "mahdinoorani@gmail.com",
            //     },
            //     date: "04/07/1403",
            //     describe:
            //       "امروز اینجام تا درمورد بازی آرژانتین و اسپانیا حرف بزنم بازی خیل خوبی بود ",
            //     title: "بازی آرژانتین و اسپانیا",
            //   },
            // ].map((reply) => (
            <div
              key={reply.id}
              className="w-[90%] md:w-[90%] mt-3 rounded-2xl bg-(--button-bg)"
            >
              <div className="w-full pt-8 pb-4 pr-4 mr-1.25 flex flex-col rounded-2xl bg-(--comment-reply-bg)">
                <div className="w-[97%] flex flex-row items-center justify-between gap-4">
                  <div className="pb-2 flex flex-row items-center gap-4">
                    <img
                      style={{ height: "64px", borderRadius: "100%" }}
                      src="/images/bob.png"
                    />
                    <div className="flex flex-col gap-1 ">
                      <p>
                        {reply?.user?.fName}
                        {reply?.user?.lName}
                      </p>
                      <p className="text-(--news-description) text-[12px] sm:text-[14px]">
                        {reply?.user?.userName}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <p className="font-semibold!">{comment.date}</p>
                    <div className="h-5 w-2 bg-[url(/images/3-dots.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                  </div>
                </div>
                <p className="w-full mt-3 font-semibold! text-xl text-(--button-bg)">
                  {reply?.title}
                </p>
                <p className="w-[90%] mt-3 font-semibold! text-(--news-description) wrap-break-word">
                  {reply?.describe}
                </p>
                <div className="w-[97%] mt-4 flex flex-row items-center justify-end gap-2">
                  <div className="flex flex-row items-center">
                    <div className="h-10 w-10 mb-2.5 bg-[url(/images/thumbs-up.svg)] bg-no-repeat bg-position-[50%] invert-(--invert-color)"></div>
                    <div className="font-bold!">223</div>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="h-10 w-10 mt-1.5 bg-[url(/images/thumbs-down.svg)] bg-no-repeat bg-position-[50%] -scale-x-100 invert-(--invert-color)"></div>
                    <div className="font-bold!">54</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={
          showMore < comments.length
            ? () => setShowMore((prev) => prev + 7)
            : () => setShowMore(2)
        }
        className={`
            w-40 p-2 rounded-2xl transition-all duration-300
            ${
              comments.length == 0
                ? "w-fit text-(--button-bg) font-semibold! border-none"
                : comments.length < 3
                  ? "hidden"
                  : showMore < comments.length && comments.length >= 3
                    ? "text-(--button-bg) border border-(--button-bg) cursor-pointer"
                    : "text-white font-semibold! bg-(--button-bg) cursor-pointer"
            }`}
      >
        {comments.length == 0
          ? "دیدگاهی وجود ندارد!"
          : showMore < comments.length
            ? "مشاهده بیشتر"
            : "بستن همه"}
      </button>
    </div>
  );
};

export default Comment;
