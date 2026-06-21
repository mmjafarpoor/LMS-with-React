import React from 'react'
import Style from './RadioTag.module.css'
import { Field, Form, Formik } from 'formik'

const FilterTag = ({name , id , value}) => {
    return (
        <div className={Style.FilterTagContainer}>
            <Field type="radio" id={id} name="priceType" value={value}></Field>
            <label htmlFor={id}>{name}</label>
        </div>
    )
}

export default FilterTag