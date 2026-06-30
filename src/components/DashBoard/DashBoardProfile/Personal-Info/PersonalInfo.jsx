import React from 'react'
import Style from './PersonalInfo.module.css'
import { Formik , Form, Field } from 'formik'
import InputWithLabel from '../../../common/InputWithLabel/InputWithLabel'
import ProfileFullName from '../../../../Data/ProfileFullName'
import ProfileContacting from '../../../../Data/ProfileContacting'
import ProfileQuadrupleInput from '../../../../Data/ProfileQuadrupleInput'
import RadioInput from '../../../common/RadioInput/RadioInput'

const PersonalInfo = () => {

    return (
        <Formik
            initialValues={{
                gender: "",
            }}
        >
            <Form className={Style.personalInfoContainer}>
                <div className={Style.informationInputWrapper}>
                    <div className={Style.inputsContainer}>
                        <div className={Style.doubleInputContainer}>
                            {ProfileFullName.map((input) => (
                                <div key={input.id}  className={Style.doubleInput}>
                                    <InputWithLabel {...input}/>
                                </div>
                            ))}
                        </div>
                        <div className={Style.singleInputContainer}>
                            <InputWithLabel id="AboutMe" title="درباره من" inputPlaceHolder="یک متن درباره خود را وارد کنید"/>
                        </div>
                        <div className={Style.quadrupleInputWrapper}>
                            <div className={Style.quadrupleInputContainer}>
                                {ProfileContacting.map((input) => (
                                    <div key={input.id}  className={Style.quadrupleInput}>
                                        <InputWithLabel {...input}/>
                                    </div>
                                ))}
                            </div>
                            <div className={Style.quadrupleInputContainer}>
                                {ProfileQuadrupleInput.map((input) => (
                                    <div key={input.id}  className={Style.quadrupleInput}>
                                        <InputWithLabel {...input}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style.singleInputContainer}>
                            <InputWithLabel id="LivingAddress" title="آدرس سکونت" inputPlaceHolder="آدرس سکونت خود را وارد کنید"/>
                        </div>
                        <div className={Style.genderCheckContainer}>
                            <span className={Style.genderCheckTitle}>جنسیت</span>
                            {[
                                {title : "مرد" , id : "Male"},
                                {title : "زن" , id : "Female"}
                            ].map((input) => (
                                <RadioInput {...input}/>
                            ))}
                        </div>
                        <button className={Style.submitTheForms}>اعمال تغییرات</button>
                    </div>
                </div>
                <div className={Style.circularProgressBarContainer}>
                    <span className={Style.profileProgressStatus}>پروفایل تکمیل شده</span>
                    <div className={Style.profileProgress}>
                        <img src="/images/progressBar.svg" alt="Progress Bar" className={Style.progressBarImg} />
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default PersonalInfo