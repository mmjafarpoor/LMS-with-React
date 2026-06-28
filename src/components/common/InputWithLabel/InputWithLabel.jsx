import React from 'react'
import Style from './InputWithLabel.module.css'
import { Field } from 'formik'

const InputWithLabel = ({title , id ,inputType = "text" , inputPlaceHolder}) => {
    return (
        <div className={Style.inputContainer}>
            <label htmlFor={id}>{title}</label>
            <Field type={inputType} id={id} name={id} placeholder={inputPlaceHolder}></Field>
        </div>
    )
}

export default InputWithLabel