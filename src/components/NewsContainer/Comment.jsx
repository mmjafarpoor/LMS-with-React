import React, { useEffect, useState } from "react";

const Comment = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(2);
  const mainComment = comments
    .filter((comment) => comment.parentId === "")
    .slice(0, showMore);
  const replyComment = (id) =>
    comments.filter((reply) => reply.parentId === id);

  const fetchItem = async () => {
    const response = await fetch(
      `http://188.121.104.25:3001/News/GetNewsComments?NewsId=${newsId}`,
    );
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsId]);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-bold! text-[24px]">نظرات</p>
        <button className="p-3 pr-14 rounded-2xl font-bold! text-[16px] text-white bg-[url(/public/images/addComment.png)] bg-no-repeat bg-position-[90%_50%] bg-(--button-bg) cursor-pointer">
          ارسال دیدگاه جدید
        </button>
      </div>
      {mainComment.map((comment) => (
        <div
          key={comment.id}
          className={
            "w-full pt-8 pb-4 rounded-3xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)] flex flex-col items-center justify-center gap-3 transition-all duration-100"
          }
        >
          <div className="w-[90%] flex flex-col gap-4">
            <div className="pb-2 flex flex-row items-center gap-2 border-b border-(--news-description)">
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
          showMore <= comments.length
            ? () => setShowMore((prev) => prev + 7)
            : () => setShowMore(2)
        }
        className={
          "w-40 p-2 rounded-2xl border border-(--button-bg) text-(--button-bg) cursor-pointer"
        }
      >
        {showMore <= comments.length ? "مشاهده بیشتر" : "بستن همه"}
      </button>
    </div>
  );
};

export default Comment;
