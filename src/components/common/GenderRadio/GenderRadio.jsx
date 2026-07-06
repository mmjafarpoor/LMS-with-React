import { useFormikContext } from "formik";
import Style from './GenderRadio.module.css'

const GenderRadio = ({ title, value }) => {
    const { values, setFieldValue } = useFormikContext();

    return (
        <div className={Style.FilterTagContainer}>
        <input
            type="radio"
            name="gender"
            checked={values.gender === value}
            onChange={() => setFieldValue("gender", value)}
        />
        <label>{title}</label>
        </div>
    );
};

export default GenderRadio;