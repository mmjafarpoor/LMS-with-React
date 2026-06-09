import React from 'react'
import Style from './SearchFilterInput.module.css'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const SearchFilterInput = () => {
    const validation = Yup.object({
        searchTheFilter : Yup.string().required(""),
    })
    return (
        <Formik initialValues={{searchTheFilter : ""}}
            onSubmit={(values) => {console.log(values);}}
            validationSchema={validation}
        >
            <Form>
                <div className={Style.searchFilter}>
                    <button className={Style.searchSubmit} type='submit'>
                        <img src="/images/filter.png" alt="Filter" className={Style.filterIcon}/>
                    </button>
                    <Field className={Style.searchInput} type="search" name="searchTheFilter" autoComplete="off" placeholder="جستجوی تکنولوژی"></Field>
                </div>
            </Form>
        </Formik>
    )
}

export default SearchFilterInput