import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

function AuthContainer() {
  const navigate = useNavigate();
  const GoToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.whole_box}>
      <div className={styles.main_box}>
        <div className={styles.icons_box}>
          <img
            onClick={GoToHome}
            className="cursor-pointer"
            src="/public/images/home.png"
          />
          <img className="cursor-pointer" src="/public/images/moon.png" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthContainer;
