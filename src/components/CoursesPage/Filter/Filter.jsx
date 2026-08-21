import React from 'react'
import { Field } from 'formik'

const Filter = ({
    name , 
    id , 
    type = "checkbox" ,
    fieldName ,
    value ,
    containerHeight = "26px",
    containerWidth = "90%",
    inputHeight = "20px",
    inputWidth = "20px",
    flexDirection = "row",
    flexWrap = "nowrap",
    gap = "6px",
}) => {
    return (
        <div 
            className="flex items-center"
            style={{ 
                height: containerHeight , 
                maxHeight: containerHeight , 
                width: containerWidth , 
                flexDirection , 
                flexWrap ,
                gap ,
            }}
        >
            <Field 
                type={type}
                id={id}
                name={fieldName}
                value={value}
                className="ms-0 cursor-pointer"
                style={{
                    width: inputWidth,
                    height: inputHeight,
                }}
            />
            <label 
                htmlFor={id}
                className="text-(--text-color) text-[1.05rem] font-semibold cursor-pointer select-none whitespace-nowrap"
            >
                {name}
            </label>
        </div>
    )
}

export default Filter