import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

function AuthContainer() {
  const navigate = useNavigate();
  const GoToHome = () => {
    navigate("/");
  };

  const themeButtonRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleDarkMode = async () => {
    const rect = themeButtonRef.current.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    if (!document.startViewTransition) {
      setIsDarkMode((prev) => {
        const newMode = !prev;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        return newMode;
      });
      return;
    }

    const transition = document.startViewTransition(() => {
      setIsDarkMode((prev) => {
        const newMode = !prev;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        return newMode;
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <div className={styles.whole_box}>
      <div className={styles.main_box}>
        <div className={styles.icons_box}>
          <img
            onClick={GoToHome}
            className="cursor-pointer invert-(--invert-color)"
            src="/images/home.png"
            alt="Home"
          />
          <img
            ref={themeButtonRef}
            onClick={toggleDarkMode}
            className="cursor-pointer"
            title={isDarkMode ? "حالت روشن" : "حالت تاریک"}
            src={isDarkMode ? "/images/lightMode.png" : "/images/darkMode.png"}
            alt={isDarkMode ? "Light Mode" : "Dark Mode"}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default AuthContainer;
