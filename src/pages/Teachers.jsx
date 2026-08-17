import React, { useState } from "react";
import TeacherData from "../components/TeacherContainer/TeacherData";
import { getTeachersList } from "../core/services/teachersService/teachersService";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/common/Pagination/Pagination";
import { TeachersBanner } from "@/assets/Gallery";

const Teachers = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const perPage = 8;
  const offset = pageIndex * perPage;

  const { data: teachers } = useQuery({
    queryFn: () => getTeachersList(),
    queryKey: ["teachers"],
  });

  const currentItems = teachers?.data?.slice(offset, offset + perPage) ?? [];
  const pageCount = Math.ceil(teachers?.data?.length / perPage);

  const handlePageClick = (event) => {
    setPageIndex(event.selected);
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center">
      <div className="w-9/10 xl:w-[85%] h-max min-w-75 mt-12.5 flex flex-wrap-reverse justify-around items-center gap-6">
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
          <img src={TeachersBanner}/>
        </div>
      </div>
      <div className="w-9/10 min-w-75 mt-12.5 mb-12.5 flex flex-col items-center gap-10">
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
          {currentItems?.map((teacherItem) => (
            <TeacherData key={teacherItem.teacherId} {...teacherItem}/>
          ))}
        </div>
        <Pagination
          pageCount={pageCount}
          pageIndex={pageIndex}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default Teachers;
