import React from "react";
import { Field } from "formik";

const FormField = ({
    name,
    id,
    type = "checkbox",
    fieldName,
    value,

    placeholder = "",
    disabled = false,
    readOnly = false,

    containerHeight = "26px",
    containerWidth = "90%",

    inputHeight = "20px",
    inputWidth = "20px",

    flexDirection = "row",
    flexWrap = "nowrap",

    gap = "6px",

    error = "",
}) => {
    const isTextInput = !["checkbox" , "radio"].includes(type);

    return (
        <div
            className="flex items-center"
            style={{
                height: containerHeight,
                maxHeight: containerHeight,
                width: containerWidth,
                flexDirection,
                flexWrap,
                gap,
            }}
        >
            {isTextInput && name && (
                <label
                    htmlFor={id}
                    className="text-(--text-color) text-[1.05rem] font-semibold cursor-pointer select-none whitespace-nowrap"
                >
                    {name}
                </label>
            )}

            <Field
                type={type}
                id={id}
                name={fieldName}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={
                    isTextInput
                        ? "px-2 border border-gray-300 rounded outline-none"
                        : "ms-0 cursor-pointer"
                }
                style={{
                    width: inputWidth,
                    height: inputHeight,
                }}
            />

            {!isTextInput && name && (
                <label
                    htmlFor={id}
                    className="text-(--text-color) text-[1.05rem] font-semibold cursor-pointer select-none whitespace-nowrap"
                >
                    {name}
                </label>
            )}

            {error && (
                <span className="text-red-500 text-sm">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormField;