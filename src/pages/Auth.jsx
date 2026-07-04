import { Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import { useEffect } from "react";
import useDarkStore from "../store/DarkStore";

function AuthContainer() {
  const navigate = useNavigate();
  const GoToHome = () => {
    navigate("/");
  };
  const isDarkMode = useDarkStore((state) => state.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode])

  return (
    <div className={styles.whole_box}>
      <div className={styles.main_box}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthContainer;
