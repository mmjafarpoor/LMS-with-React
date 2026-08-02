import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const resizeHandler = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };

        window.addEventListener("resize", resizeHandler);

        return () => {
        window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;