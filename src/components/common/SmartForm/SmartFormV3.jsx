import React from "react";
import { Field } from "formik";

const FormField = ({
    // Label
    label = "",

    // Input
    id,
    name,
    type = "text",
    value,
    placeholder = "",

    // Icon
    icon = null,
    iconPosition = "start",
    onIconClick,
    alt = "",

    // Size
    containerHeight = "auto",
    containerWidth = "100%",
    inputHeight = "40px",
    inputWidth = "100%",

    // Flex
    flexDirection = "column",
    flexWrap = "nowrap",
    gap = "6px",

    // State
    disabled = false,
    readOnly = false,

    // Colors
    labelColor = "var(--text-color)",
    textColor = "var(--text-color)",
    borderColor = "var(--border-color)",
    backgroundColor = "var(--input-bg)",

    // Validation
    error = "",

}) => {
    const hasIcon = Boolean(icon);
    const iconAtStart = iconPosition === "start";

    const Icon = hasIcon ? (
        <button
            type="button"
            onClick={onIconClick}
            disabled={disabled}
            className="
                absolute
                top-1/2
                -translate-y-1/2
                w-5 h-5
                flex items-center justify-center
                p-0
                border-0
                bg-transparent
                cursor-pointer
            "
            style={{
                [iconAtStart ? "insetInlineStart" : "insetInlineEnd"]:
                    "12px",
            }}
        >
            <img
                src={icon}
                alt={alt}
                className="w-5 h-5"
            />
        </button>
    ) : null;

    return (
        <div
            className="flex"
            style={{
                minHeight: containerHeight,
                width: containerWidth,
                flexDirection,
                flexWrap,
                gap,
            }}
        >
            {label && (
                <label
                    htmlFor={id}
                    className="
                        text-[1.05rem]
                        font-semibold
                        cursor-pointer
                        select-none
                        whitespace-nowrap
                    "
                    style={{
                        color: labelColor,
                    }}
                >
                    {label}
                </label>
            )}

            <div
                className="relative"
                style={{
                    width: inputWidth,
                    height: inputHeight,
                }}
            >
                {iconAtStart && Icon}

                <Field
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={`
                        w-full
                        h-full
                        rounded-md
                        border
                        outline-none
                        ${hasIcon && iconAtStart ? "ps-10" : ""}
                        ${hasIcon && !iconAtStart ? "pe-10" : ""}
                    `}
                    style={{
                        color: textColor,
                        borderColor,
                        backgroundColor,
                    }}
                />

                {!iconAtStart && Icon}
            </div>
            {/* Error */}
            {error && (
                <span className="text-red-500 text-sm">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormField;