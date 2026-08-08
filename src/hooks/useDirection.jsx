import { useEffect } from "react";
import { useTranslation } from "react-i18next";

    const LANGUAGE_DIRECTION = {
        fa: "rtl",
        en: "ltr",
    };

    const useDirection = () => {
    const { i18n } = useTranslation();

    const direction = LANGUAGE_DIRECTION[i18n.language] || "ltr";

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = i18n.language;
    }, [i18n.language, direction]);

    return {
        direction,
        isRTL: direction === "rtl",
        isLTR: direction === "ltr",
    };
};

export default useDirection;