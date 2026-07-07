import { Field, Form, Formik } from 'formik'
import React from 'react'
import Style from './Connections.module.css'
import userInfoStore from '../../../../store/UserInfoStore';
import { DirtySave } from '../../../common/AutoSave/AutoSave';
import { editUserDataMapper } from '../../../../core/services/dashBoardService/editUserDataMapper';
import { editUserApiData } from '../../../../core/services/dashBoardService/dashBoardApi';


const Connections = () => {

    const {user , fetchUser} = userInfoStore();
    

    return (
        <Formik
            enableReinitialize
            initialValues={{
                LinkedIn : user?.userLinkedIn,
                Telegram : user?.userTelegram,
                FirstName: user?.userName || "",
                LastName: user?.userLastName || "",
                AboutMe: user?.userBiography || "",
                PhoneNumber: user?.userPhoneNumber || "",
                Email: user?.userEmailAddress || "",    
                NationalCode: user?.userPersonalId || "",
                BirthDay: user?.userBirthDay || "2024-07-16",
                LivingAddress: user?.userLivingAddress || "",
                gender: true,
            }}
        >
            <Form className={Style.connectionsContainer}>
                <DirtySave onSave={async (values) => {const formData = editUserDataMapper(values);await editUserApiData(formData);fetchUser();}}/>
                <div className={Style.contentWrapper}>
                    <div className={Style.inputContainer}>
                        <label htmlFor="Telegram">تلگرام</label>
                        <div className={Style.inputWrapper}>
                            <img src="/images/dashBoardTelegram.svg" alt="Telegram-Image" className={Style.inputImg}/>
                            <Field type="text" id="Telegram" name="Telegram" placeholder="لینک تلگرام خود را وارد کنید"></Field>
                        </div>
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="LinkedIn">لینکدین</label>
                        <div className={Style.inputWrapper}>
                            <img src="/images/dashBoardLinkedIn.svg" alt="linkedIn-Image" className={Style.inputImg}/>
                            <Field type="text" id="LinkedIn" name="LinkedIn" placeholder="لینک لینکدین خود را وارد کنید"></Field>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default Connections