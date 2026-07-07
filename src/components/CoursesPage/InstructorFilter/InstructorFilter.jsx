import React from 'react'
import Style from './InstructorFilter.module.css'
import { Field, Form, Formik } from 'formik'

const InstructorFilter = ({name , id}) => {
    return (
        <div className={Style.FilterTagContainer}>
            <Field type="checkbox" id={id} name="teacherId" value={String(id)}></Field>
            <label htmlFor={id}>{name}</label>
        </div>
    )
}

export default InstructorFilter