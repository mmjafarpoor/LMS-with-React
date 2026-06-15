import { Field, Form, Formik } from 'formik'
import React from 'react'
import Style from './SendUsMessage.module.css'

const SendUsMessage = () => {
    return (
        <Formik>
            <Form className={Style.sendUsMessageContainer}>
                <div className={Style.sendUsMessage}>
                    <div className={Style.headingContainer}>
                        <span className={Style.headingTitle}>برای ما پیام ارسال کنید</span>
                        <span className={Style.headingDescription}>آدرس ایمیل شما منتشر نخواهد شد. فیلدهای الزامی علامت گذاری شده اند *</span>
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="contentInput" className={Style.contentInputContainer}>
                            <Field as="textarea" name="contentInput" id="contentInput" className={Style.contentInput} placeholder="متن پیام"></Field>
                        </label>
                        <div className={Style.senderInfo}>
                            <Field type="text" className={Style.senderInfoInput} placeholder="نام *"></Field>
                            <Field type="email" className={Style.senderInfoInput} placeholder="پست الکترونیک *"></Field>
                            <Field type="url" className={Style.senderInfoInput} placeholder="سایت اینترنتی *"></Field>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default SendUsMessage