import React from 'react'
import Style from './PersonalInfo.module.css'
import { Formik , Form } from 'formik'
import InputWithLabel from '../../../common/InputWithLabel/InputWithLabel'
import ProfileFullName from '../../../../Data/ProfileFullName'
import ProfileContacting from '../../../../Data/ProfileContacting'
import ProfileQuadrupleInput from '../../../../Data/ProfileQuadrupleInput'

const PersonalInfo = () => {

    return (
        <Formik>
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
                    </div>
                </div>
                <div className={Style.circularProgressBarContainer}></div>
            </Form>
        </Formik>
    )
}

export default PersonalInfo