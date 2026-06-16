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
        <Outlet />
      </div>
    </div>
  );
}

export default AuthContainer;
