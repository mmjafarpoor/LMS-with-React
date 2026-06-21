import { useEffect, useState } from "react";

const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
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