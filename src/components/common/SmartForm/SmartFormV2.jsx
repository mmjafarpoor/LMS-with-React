import React from "react";
import { Field } from "formik";

const StartFormV2 = ({
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
    alt = "",

    // Size
    containerHeight = "auto",
    containerWidth = "100%",
    inputHeight = "40px",
    inputWidth = "100%",

    // Flex
    flexDirection = "row",
    flexWrap = "nowrap",
    gap = "6px",

    // Input states
    disabled = false,
    readOnly = false,

    // Colors
    labelColor = "var(--text-color)",
    textColor = "var(--text-color)",
    borderColor = "var(--border-color)",
    backgroundColor = "var(--input-background)",

    // Validation
    error = "",
    
}) => {
    const hasIcon = Boolean(icon);
    const hasLabel = Boolean(label);

    const iconAtStart = iconPosition === "start";

    return (
        <div
            className="flex items-center"
            style={{
                minHeight: containerHeight,
                width: containerWidth,
                flexDirection,
                flexWrap,
                gap,
            }}
        >
            {/* Label */}
            {hasLabel && (
                <label
                    htmlFor={id}
                    className="
                        text-start
                        text-[1.05rem]
                        font-semibold
                        cursor-pointer
                        select-none
                        whitespace-nowrap
                    "
                    style={{ color: labelColor , }}
                >
                    {label}
                </label>
            )}

            {/* Input + Icon */}
            <div
                className="relative"
                style={{
                    width: inputWidth,
                    height: inputHeight,
                }}
            >
                {/* Start Icon */}
                {hasIcon && iconAtStart && (
                    <img
                        src={icon}
                        alt=""
                        className="
                            absolute
                            start-3
                            top-1/2
                            -translate-y-1/2
                            w-5
                            h-5
                            pointer-events-none
                        "
                    />
                )}

                <Field
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    style={{
                        color: textColor,
                        borderColor,
                        backgroundColor,
                    }}
                    className={`
                        w-full
                        h-full
                        border
                        rounded-md
                        outline-none

                        ${hasIcon && iconAtStart ? "ps-10" : ""}
                        ${hasIcon && !iconAtStart ? "pe-10" : ""}
                    `}
                />

                {/* End Icon */}
                {hasIcon && !iconAtStart && (
                    <img
                        src={icon}
                        alt={alt}
                        className="
                            absolute
                            end-3
                            top-1/2
                            -translate-y-1/2
                            w-5
                            h-5
                            pointer-events-none
                        "
                    />
                )}
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

export default StartFormV2;