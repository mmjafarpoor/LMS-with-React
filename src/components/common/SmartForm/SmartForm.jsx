const SmartForm = ({
    name,
    id,
    type = "text",
    fieldName,
    value,
    placeholder = "",
    icon,
    iconPosition = "start",
}) => {
    const isStart = iconPosition === "start";

    return (
        <div className="flex flex-col gap-1">
            {name && (
                <label
                    htmlFor={id}
                    className="text-start text-(--text-color) font-semibold"
                >
                    {name}
                </label>
            )}

            <div className="relative">
                {icon && isStart && (
                    <img
                        src={icon}
                        alt=""
                        className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                )}

                <Field
                    id={id}
                    type={type}
                    name={fieldName}
                    value={value}
                    placeholder={placeholder}
                    className={`
                        w-full h-10
                        border rounded-md outline-none
                        ${icon && isStart ? "ps-10" : ""}
                        ${icon && !isStart ? "pe-10" : ""}
                    `}
                />

                {icon && !isStart && (
                    <img
                        src={icon}
                        alt=""
                        className="absolute end-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                )}
            </div>
        </div>
    );
};

export default SmartForm;