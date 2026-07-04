import { useFormikContext } from "formik";
import { useEffect } from "react";

    const FormLogger = ({setCourseFilters}) => {
    const { values } = useFormikContext();

    useEffect(() => {
        setCourseFilters(values);
        console.log(values);
    }, [values]);

    return null;
    };

export default FormLogger;