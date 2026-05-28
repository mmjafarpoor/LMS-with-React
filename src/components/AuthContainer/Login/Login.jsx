import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";

const validationSchema = Yup.object({
  email: Yup.string().required("ایمیل یا شماره تماس نمی‌تواند خالی باشد"),
  password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
});

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  const [otp, setOtp] = useState("");
  const renderSeparator = (index) => {
    if (index === 2) {
      return <div className="mx-2 h-1 w-2.5 bg-[#B5B5B5]"></div>;
    }
  };

  return (
    <>
      <img
        style={{ height: "180px", marginTop: "32px" }}
        src="/public/images/logo2.png"
      />
      <p className="font-bold! text-2xl mt-4 mb-4">ورود به حساب کاربری</p>

      {/* STEP 1 */}

      {step === 1 && (
        <p className="text-[16px] text-[#A6A6A6]">
          لطفا شماره موبایل یا ایمیل خود را وارد کنید
        </p>
      )}

      {step === 1 && (
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setEmail(values.email);
            setPassword(values.password);
            setStep(2);
            // console.log("step 1 success")
          }}
          validationSchema={validationSchema}
        >
          <Form className="w-[80%] flex flex-col">
            <Field
              type="text"
              name="email"
              placeholder="ایمیل یا شماره تماس"
              className="h-12 w-full rounded-xl mt-4 mb-2 indent-12
             bg-[url('/public/images/user.png')] bg-no-repeat bg-position-[97%] bg-[#F4F4F4]"
            />
            <ErrorMessage
              component="p"
              name="email"
              className="text-[#0CBDE2] text-[12px] indent-2"
            />
            <Field
              type="password"
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              className="h-12 w-full rounded-xl mt-2 mb-2 indent-12
            bg-[url('/public/images/password.png')] bg-no-repeat bg-position-[97%] bg-[#F4F4F4]"
            />
            <ErrorMessage
              component="p"
              name="password"
              className="text-[#0cbee2] text-[12px] indent-2"
            />
            <div className="flex flex-row items-center justify-between mt-2 w-full">
              <div className="flex flex-row items-center gap-1.25">
                <div className="h-3.5 w-3.5 border border-[#A6A6A6] rounded-sm text-[14px] cursor-pointer"></div>
                <p>مرا به خاطر بسپار</p>
              </div>
              <Link
                className="text-[14px] text-[#A6A6A6] duration-150 hover:text-[#0CBDE2]"
                to="/forget-password"
              >
                فراموشی رمز عبور
              </Link>
            </div>
            <button
              type="submit"
              className="h-12 w-full mt-4 font-bold! text-white bg-[#0CBDE2] flex items-center justify-center rounded-xl cursor-pointer"
            >
              ارسال کد یکبار مصرف
            </button>
            <div className="flex flex-row justify-center mt-6 mb-8 ">
              <p>حساب کاربری ندارید؟</p>
              <Link className="mr-2 text-[#0CBDE2]" to="/sign-up">
                ثبت‌نام
              </Link>
            </div>
          </Form>
        </Formik>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <p className="text-[18px] text-[#A6A6A6]">
          رمز یکبار مصرف را وارد کنید
        </p>
      )}

      {step === 2 && (
        <div data-otp="true" className="w-[80%] mt-4 flex justify-around">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={renderSeparator}
            skipDefaultStyles={true}
            renderInput={(props) => (
              <input
                {...props}
                className="h-11.5 w-11 m-0.5 text-center text-xl bg-[#F4F4F4] border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#0CBDE2] caret-[#0CBDE2]"
              />
            )}
            inputType="tel"
            shouldAutoFocus={true}
          />
        </div>
      )}

      <button
        type="submit"
        className="h-12 w-[80%] mt-4 font-bold! text-white bg-[#0CBDE2] flex items-center justify-center rounded-xl cursor-pointer"
      >
        ارسال کد یکبار مصرف
      </button>
    </>
  );
};

export default Login;
