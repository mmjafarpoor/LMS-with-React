import { Outlet } from "react-router-dom";

const AuthContainer = () => {
  return (
    <div
      className="w-full h-full flex justify-center items-center bg-(--auth-bg) bg-[url('../assets/img/banners/auth-banner.svg')] bg-no-repeat bg-center bg-contain">
      <div className="h-max w-125 max-w-full bg-(--auth-main-bg) rounded-[20px] text-(--text-color) flex flex-col items-center relative">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthContainer;
