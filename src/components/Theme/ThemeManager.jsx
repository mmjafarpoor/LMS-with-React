import useDarkStore from "@/store/DarkStore";
import { useEffect } from "react";

export const ThemeManager = () => {
const isDarkMode = useDarkStore((state) => state.isDarkMode);

useEffect(() => {
    if (isDarkMode) {
    document.documentElement.classList.add("dark-theme");
    } else {
    document.documentElement.classList.remove("dark-theme");
    }
}, [isDarkMode]);

return null;

};