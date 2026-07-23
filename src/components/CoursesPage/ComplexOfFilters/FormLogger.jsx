import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";


    const FormLogger = ({setCourseFilters}) => {
    const { values } = useFormikContext();

    const [debouncedValues] = useDebounce(values, 500);

    useEffect(() => {
        // setCourseFilters(values);
        setCourseFilters(debouncedValues);
        console.log(values);
    }, [debouncedValues,setCourseFilters]);

    return null;
    };

export default FormLogger;