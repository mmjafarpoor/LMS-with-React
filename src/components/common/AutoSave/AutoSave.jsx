import { useFormikContext } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AutoSave = ({onSave }) => {
    const { values } = useFormikContext();

    useEffect(() => {
        const timer = setTimeout(async () => {
            console.log(values);

            try {
                await onSave(values);
                toast.success("اطلاعات شما با موفقیت بروز شد");
            } catch (error) {
                console.log(error);
                toast.error("در بروز رسانی اطلاعات شما خطایی رخ داد");
            }

            // updateUser(...)
            // editUserApiData(...)

        }, 1200);

        return () => clearTimeout(timer);
    }, [values]);

    return null;
};

export const DirtySave = ({onSave }) => {
    const { values, touched, dirty } = useFormikContext();

    useEffect(() => {
    
        if (!dirty) return;
        if (!Object.keys(touched).length) return;

        const timer = setTimeout(async () => {
            console.log(values);
            try {
                await onSave(values);
                toast.success("اطلاعات شما با موفقیت بروز شد");
            } catch (error) {
                console.log(error);
                toast.error("در بروز رسانی اطلاعات شما خطایی رخ داد");
            }
        }, 1200);

        return () => clearTimeout(timer);

    }, [values, touched, dirty]);

    return null;
}