import React from 'react'
import Style from './PersonalInfo.module.css'
import { Formik , Form, Field } from 'formik'
import InputWithLabel from '../../../common/InputWithLabel/InputWithLabel'
import ProfileFullName from '../../../../Data/ProfileFullName'
import ProfileContacting from '../../../../Data/ProfileContacting'
import ProfileQuadrupleInput from '../../../../Data/ProfileQuadrupleInput'
import userInfoStore from '../../../../store/UserInfoStore'
import { editUserApiData } from '../../../../core/services/dashBoardService/dashBoardApi'
import { editUserDataMapper } from '../../../../core/services/dashBoardService/editUserDataMapper'
import { toast } from 'react-toastify'
import GenderRadio from '../../../common/GenderRadio/GenderRadio'

const PersonalInfo = () => {

    const {user , fetchUser} = userInfoStore();



    return (
        <Formik
            enableReinitialize
            initialValues = {{
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
            onSubmit = {async (values) => {
                try {
                    const formData  = editUserDataMapper(values);
                    for (const [key, value] of formData.entries()) {
                        console.log(key, value);
                    }
                    console.log("Field Values =",formData);
                    const response = await editUserApiData(formData);
                    console.log("Fields Changed =",response.data)

                    await fetchUser();
                    
                    // updateUser({
                    //     userName: values.FirstName,
                    //     userLastName: values.LastName,
                    //     userBiography: values.AboutMe,
                    // });

                    toast.success("اطلاعات با موفقیت ویرایش شد");
                } catch (error) {
                    console.log(error);
                    console.log(error.response?.status);
                    console.log(error.response);
                    console.log(error.response?.data);
                    toast.error(error)
                }
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
                                {title : "مرد" , value : true},
                                {title : "زن" , value : false}
                            ].map((input) => (
                                <GenderRadio key={input.title} {...input}/>
                            ))}
                        </div>
                        <button type='submit' className={Style.submitTheForms}>اعمال تغییرات</button>
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