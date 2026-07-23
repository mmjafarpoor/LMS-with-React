import React, { useState, useEffect } from "react";
import styles from "../styles/Teachers.module.css";
import TeacherData from "../components/TeacherContainer/TeacherData";
import ReactPaginate from "react-paginate";
import { getTeachersList } from "../core/services/teachersService/teachersService";

const Teachers = () => {
  const [teachersItems, setTeachersItems] = useState([]);

  const [pageIndex, setPageIndex] = useState(0);
  const perPage = 8;
  const offset = pageIndex * perPage;
  const currentItems = teachersItems.slice(offset, offset + perPage);
  const pageCount = Math.abs(teachersItems.length / perPage);

  const fetchNews = async () => {
    const response = await getTeachersList();
    console.log("Teacher =",response.data);
    setTeachersItems(response.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews();
  }, []);

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
          <img src="/images/teachers.png" />
        </div>
      </div>
      <div className={styles.data_container}>
        <div className="hidden lg:flex flex-col gap-4 items-center lg:w-[50%] xl:w-[40%] bg-[url(/images/blueLine.png)] bg-no-repeat bg-position-[50%_30px]">
          <h1 className="lg:text-[30px] sm:text-[26px] text-[20px] font-bold!">
            رهبری ما
          </h1>
          <p className="flex items-center text-center lg:text-[16px] sm:text-[14px] text-[10px] w-[80%] xl:w-fit text-(--news-description)">
            مدیران ما با الگو گرفتن و راهنمایی ما را برای انجام کارهای بزرگ هر
            روز راهنمایی می کنند. با تجربه در سراسر صنایع، وسعت و عمق تخصص آنها
            ما را قادر می سازد تا مشکلات را حل کنیم، چشم انداز خود را درک کنیم و
            به مشتریان خود و یکدیگر خدمات بهتری ارائه دهیم.
          </p>
        </div>
        <div className="w-full h-fit mt-6 flex flex-row flex-wrap justify-around gap-2 gap-y-8">
          {currentItems.map((teacherItem) => (
            <TeacherData key={teacherItem.teacherId} {...teacherItem}/>
          ))}
        </div>
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={(page) => setPageIndex(page.selected)}
            containerClassName={"h-12 px-2 -mt-6 rounded-2xl flex flex-row gap-1 items-center text-2xl bg-(--news-boxs) shadow-[0_0px_8px_var(--news-shadow-color)]"}
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
  );
};

export default Teachers;
