import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const themeButtonRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });
    
    const toggleDarkMode = async () => {
    const rect = themeButtonRef.current.getBoundingClientRect();

    const darkSwitch_X = rect.left + rect.width / 2;
    const darkSwitch_Y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
        Math.max(darkSwitch_X, window.innerWidth - darkSwitch_X),
        Math.max(darkSwitch_Y, window.innerHeight - darkSwitch_Y),
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
            `circle(0px at ${darkSwitch_X}px ${darkSwitch_Y}px)`,
            `circle(${endRadius}px at ${darkSwitch_X}px ${darkSwitch_Y}px)`,
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
        toast.success("حالت تاریک فعال شد 🌙",{
            theme: "dark"
        });
    } else {
        document.body.classList.remove("dark-theme");
        toast.success("حالت روشن فعال شد ☀️");
    }
    }, [isDarkMode]);

                                // This Is A Logic Version Control
                                // This Version Has Animation On Theme