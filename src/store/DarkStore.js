import { toast } from "react-toastify";
import { create } from "zustand";

const useDarkStore = create((set) => ({
    isDarkMode: localStorage.getItem("theme") === "dark",

    toggleDarkMode: () =>
        set((state) => {
            const newMode = !state.isDarkMode;
            toast.success(
                newMode
                    ? "حالت تاریک فعال شد 🌙"
                    : "حالت روشن فعال شد ☀️",
                // {
                //     theme: newMode ? "dark" : "light",
                // }
            );
            localStorage.setItem(
                "theme",
                newMode ? "dark" : "light"
            );
            return {
                isDarkMode: newMode,
            };
        }),
}));

export default useDarkStore;