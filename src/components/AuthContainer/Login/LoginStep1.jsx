import React from 'react'
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required("ایمیل نمی‌تواند خالی باشد"),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
});

const LoginStep1 = ({ onSuccess }) => {
  return (
    <>
      <h2 className="text-2xl mb-8 font-bold">ورود به حساب کاربری</h2>
      <p className="text-[#6D6C80] mb-3">
        لطفا شماره موبایل یا ایمیل خود را وارد کنید
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onSuccess(values.email, values.password);
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <Field
            type="text"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            className="h-12 w-full rounded-3xl mt-3 mb-3 indent-8 bg-[#FBFBFB] shadow-inner shadow-black/5"
          />

          <ErrorMessage
            component="p"
            name="email"
            className="text-[#d40000] text-[12px] indent-2"
          />

          <Field
            type="password"
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            className="h-12 w-full rounded-3xl mt-3 mb-3 indent-8 bg-[#FBFBFB] shadow-inner shadow-black/5"
          />

          <ErrorMessage
            component="p"
            name="password"
            className="text-[#d40000] text-[12px] indent-2"
          />

          <div className="flex flex-row items-center justify-between mt-2.5">
            <div className="flex flex-row items-center gap-1.25">
              <div></div>
              <p>مرا به خاطر بسپار</p>
            </div>
            <Link to="/forget-password">
              فراموشی رمز؟
            </Link>
          </div>

          <button type="submit">
            ورود به حساب کاربری
          </button>
        </Form>
      </Formik>

      <div>
        <p>حساب کاربری ندارید؟</p>
        <Link to="/sign-up">
          ثبت‌نام
        </Link>
      </div>
    </>
  );
};

export default LoginStep1;
