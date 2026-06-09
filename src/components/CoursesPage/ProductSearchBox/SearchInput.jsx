import React from 'react'
import Style from './SearchInput.module.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
const SearchInput = () => {
    const validationSchema = Yup.object({
    search: Yup.string().required("نام محصول را وارد کنید"),
});
    return (
        <Formik
            initialValues={{search : "",}}
            onSubmit={(values) => {console.log(values);}}
            validationSchema={validationSchema}
        >
            {({ touched, errors }) => (
                <Form>
                    <div className={Style.searchBox}>
                        <div className={Style.searchContainer}>
                            <button className={Style.search} type="submit">
                                <img src="/images/search.png" alt="SearchIcon" />
                            </button>
                            <Field className={Style.searchInput} type="search" name="search" autoComplete="off" placeholder="جستجو دوره ها"></Field>
                        </div>
                        {touched.search && errors.search && (
                            <ErrorMessage component={"span"} name="search" className={Style.errorMessage}/>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SearchInput