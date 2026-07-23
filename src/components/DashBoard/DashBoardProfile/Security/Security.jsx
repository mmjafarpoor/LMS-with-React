import React, { useEffect, useState } from 'react'
import Style from './Security.module.css'
import { Field, Form, Formik } from 'formik'
import { editSecurity, getSecurity } from '../../../../core/services/dashBoardService/dashBoardApi'
import { toast } from 'react-toastify'

const Security = () => {

    const [securityInfo, setSecurityInfo] = useState({});

    const securityParameters = async () => {
        try {
            const response = await getSecurity();
            console.log(response.data);
            setSecurityInfo(response.data);
        } catch (error) {
            console.log(error);
            toast.error("در دریافت اطلاعات امنیتی حساب شما خطایی پیش آمد");
        }
    }
    useEffect(() => {
        securityParameters();
    }, [])

    return (
    <Formik
        enableReinitialize
        initialValues={{
            TelegramId: securityInfo?.userTelegrams?.telegramId || "",
            twoStepAuth: securityInfo?.twoStepAuth ?? false,
            RecoveryMail: securityInfo?.recoveryEmail || "",
        }}
        onSubmit={async (values) => {
            try {
                const response = await editSecurity({
                    twoStepAuth: values.twoStepAuth,
                    recoveryEmail: values.RecoveryMail,
                    telegramUsername: values.TelegramId,
                });
                console.log(response.data);
                toast.success("اطلاعات امنیتی شما با موفقیت تغیر کرد");
                await securityParameters();
            } catch (error) {
                console.log(error);
                console.log(error.response);
                toast.error("در تغیر اطلاعات امنیتی شما خطایی رخ داد");
            }
        }}
    >
        <Form className={Style.securityContainer}>
            <div className={Style.contentWrapper}>
                <div className={Style.inputContainer}>
                    <label htmlFor="TelegramId">آیدی تلگرام</label>
                    <div className={Style.inputWrapper}>
                        <img src="/images/dashBoardTelegram.svg" alt="Telegram-Image" className={Style.inputImg}/>
                        <Field type="text" id="TelegramId" name="TelegramId" placeholder="آیدی تلگرام خود را وارد کنید"></Field>
                    </div>
                </div>
                <div className={Style.inputContainer}>
                    <span className={Style.radioTagTitle}>تایید دو‌ مرحله ایی</span>
                    <Field name="twoStepAuth">
                        {({ field, form }) => (
                            <div className={Style.radioGroup}>
                                <label className={Style.radioLabel}>فعال
                                    <Field type="radio" name="twoStepAuth" checked={field.value === true} onChange={() => form.setFieldValue("twoStepAuth", true)} className={Style.radioTag}/>
                                </label>
                                <label className={Style.radioLabel}>غیرفعال
                                    <Field type="radio" name="twoStepAuth" checked={field.value === false} onChange={() => form.setFieldValue("twoStepAuth", false)} className={Style.radioTag}/>
                                </label>
                            </div>
                        )}
                    </Field>
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="RecoveryMail">ایمیل بازیابی</label>
                    <div className={Style.inputWrapper}>
                        <img src="/images/dashBoardLinkedIn.svg" alt="linkedIn-Image" className={Style.inputImg}/>
                        <Field type="text" id="RecoveryMail" name="RecoveryMail" placeholder="ایمیل بازیابی خود را وارد کنید"></Field>
                    </div>
                </div>
                <button type='submit' className={Style.submitChanges}>اعمال تغیرات</button>
            </div>
        </Form>
    </Formik>
    )
}

export default Security