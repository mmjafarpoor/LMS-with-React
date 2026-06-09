import React from 'react'
import Style from './FilterTag.module.css'
import { Field, Form, Formik } from 'formik'

const FilterTag = ({name , id ,checkBoxStatus = false}) => {
    const handleFilterChange = (filterValues) => {
        console.log("فیلترهای جدید:", filterValues);
    };
    return (
        <Formik
            initialValues={{[id] : checkBoxStatus}}
            onChange={(values)=>{
                handleFilterChange(values);
            }}
        >
            <Form>
                <div className={Style.FilterTagContainer}>
                    <Field type="checkbox" id={id} name={id}></Field>
                    <label htmlFor={id}>{name}</label>
                </div>
            </Form>
        </Formik>
    )
}

export default FilterTag