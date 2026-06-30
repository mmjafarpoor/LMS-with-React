import { Field, Form, Formik } from 'formik'
import React from 'react'
import Style from './Connections.module.css'

const Connections = () => {
    return (
        <Formik
            initialValues={{
                linkedIn : "",
                telegram : "",
            }}
        >
            <Form className={Style.connectionsContainer}>
                <div className={Style.contentWrapper}>
                    <div className={Style.inputContainer}>
                        <label htmlFor="telegram">تلگرام</label>
                        <div className={Style.inputWrapper}>
                            <img src="/images/dashBoardTelegram.svg" alt="Telegram-Image" className={Style.inputImg}/>
                            <Field type="text" id="telegram" name="telegram" placeholder="لینک تلگرام خود را وارد کنید"></Field>
                        </div>
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="linkedIn">لینکدین</label>
                        <div className={Style.inputWrapper}>
                            <img src="/images/dashBoardLinkedIn.svg" alt="linkedIn-Image" className={Style.inputImg}/>
                            <Field type="text" id="linkedIn" name="linkedIn" placeholder="لینک لینکدین خود را وارد کنید"></Field>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Connections