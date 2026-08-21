import React from 'react'
import { Field } from 'formik'

const FilterTag = ({name , id , value}) => {
    return (
        <div className="h-6.5 max-h-6.5 w-max flex items-center gap-1.5">
            <Field 
                type="radio" 
                id={id} 
                name="priceType" 
                value={value} 
                className="w-5 h-5 mr-0 cursor-pointer"
            />
            <label 
                htmlFor={id}
                className="text-(--text-color) text-[1.05rem] font-semibold cursor-pointer select-none whitespace-nowrap"
            >{name}</label>
        </div>
    )
}

export default FilterTag