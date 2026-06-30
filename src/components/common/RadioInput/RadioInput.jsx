import React from 'react'
import Style from './RadioInput.module.css'
import { Field } from 'formik'

const RadioInput = ({title , id}) => {
    return (
        <div className={Style.FilterTagContainer}>
            <Field type="radio" id={id} name="gender" value={id}></Field>
            <label htmlFor={id}>{title}</label>
        </div>
    )
}

export default RadioInput