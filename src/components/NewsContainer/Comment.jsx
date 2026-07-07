import { Formik, Form, Field } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";

const Comment = ({ newsId, courseId }) => {
  const ItemId = newsId ?? courseId;
  const [commentModalActive, isCommentModalActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(2);
  const mainComment = comments
    .filter((comment) => comment.parentId === "")
    .slice(0, showMore);
  const replyComment = (id) =>
    comments.filter((reply) => reply.parentId === id);

  const fetchItem = async () => {
    const response = await fetch(
      `http://188.121.104.25:3001/News/GetNewsComments?NewsId=${ItemId}`,
    );
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ItemId]);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold! text-[24px]">نظرات</p>
        <button
          onClick={() => {
            isCommentModalActive(!commentModalActive);
          }}
          className="w-50 p-3 pr-14 rounded-2xl font-semibold! text-[16px] text-white bg-[url(/images/addComment.png)] bg-no-repeat bg-position-[90%_50%] bg-(--button-bg) cursor-pointer"
        >
          {commentModalActive ? "بستن ارسال دیدگاه" : "ارسال دیدگاه جدید"}
        </button>
      </div>
      <div
        className={`
          w-full transition-all overflow-hidden flex flex-col justify-around items-center
          ${commentModalActive ? "max-h-500 w-full py-9 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]" : "h-0"}`}
      >
        <Formik>
          <Form className="w-[92%] flex flex-col gap-4.5">
            <TextareaAutosize
              minRows={3}
              maxRows={12}
              name="comment"
              placeholder="لطفا دیدگاه خود را وارد کنید"
              className="w-full p-4 rounded-2xl bg-(--input-bg) transition-all resize-none
              outline-none border border-transparent focus:border-[#0CBDE2]"
            />
            {/* <Field
              as="textarea"
              type="text"
              name="comment"
              placeholder="لطفا دیدگاه خود را وارد کنید"
              className="w-full h-27 p-4 rounded-2xl bg-(--input-bg) resize-none"
            ></Field> */}
            <button
              type="submit"
              className="h-12 w-45 rounded-2xl text-center text-white font-semibold! bg-(--button-bg) cursor-pointer"
            >
              ثبت و ارسال دیدگاه
            </button>
          </Form>
        </Formik>
      </div>
      {mainComment.map((comment) => (
        <div
          key={comment.id}
          className={
            "w-full pt-8 pb-4 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex flex-col items-center justify-center gap-3 transition-all duration-100"
          }
        >
          <div className="w-[90%] flex flex-col gap-4">
            <div className="pb-2 flex flex-row items-center justify-between border-b border-(--news-description)">
              <div className="flex flex-row items-center gap-2">
                <img
                  style={{ height: "64px", borderRadius: "100%" }}
                  src="/images/bob.png"
                />
                <div className="flex flex-col gap-1 ">
                  <p>
                    {comment?.user?.fName}
                    {comment?.user?.lName}
                  </p>
                  <p className="text-(--news-description) text-[12px] sm:text-[14px]">
                    {comment?.user?.userName}
                  </p>
                </div>
              </div>
              {/* <button className="py-2 px-5 bg-(--button-bg) rounded-xl font-semibold! cursor-pointer">پاسخ</button> */}
            </div>
          </div>
          <p className="w-[90%] font-semibold! text-(--news-description)">
            {comment?.describe}
          </p>
          {replyComment(comment.id).map((reply) => (
            <div
              key={reply.id}
              className="w-[90%] md:w-[87%] mt-3 rounded-2xl bg-(--button-bg)"
            >
              <div className="w-full pt-8 pb-4 pr-4 mr-1.25 rounded-2xl bg-(--comment-reply-bg)">
                <div className="w-[90%] flex flex-col gap-4">
                  <div className="pb-2 flex flex-row items-center gap-2 border-b border-(--news-description)">
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
                </div>
                <p className="w-[90%] mt-3 font-semibold! text-(--news-description)">
                  {reply?.describe}
                </p>
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
            w-40 p-2 rounded-2xl transition-all
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
