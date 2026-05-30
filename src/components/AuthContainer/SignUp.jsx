import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(otp);
  console.log(password);

  const renderSeparator = (index) => {
    if (index === 2) {
      return <div className="mx-2 h-1 w-2.5 bg-[#B5B5B5]"></div>;
    }
  };

  const [time, setTime] = useState(120);
  const minute = Math.floor(time / 60);
  const second = time % 60;

  useEffect(() => {
    if (step !== 2 || time === 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, time]);

  let validationSchema;
  if (step === 1) {
    validationSchema = Yup.object({
      email: Yup.string().required("ایمیل یا شماره تماس نمی‌تواند خالی باشد"),
    });
  } else if (step === 2) {
    validationSchema = Yup.object({
      otp: Yup.string().required("کد تایید الزامی است"),
    });
  } else if (step === 3) {
    validationSchema = Yup.object({
      password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
      passwordRepeat: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
    });
  }

  return (
    <>
      <img
        style={{ height: "180px", marginTop: "32px" }}
        src="/public/images/logo2.png"
      />
      <p className="font-bold! text-2xl mt-4 mb-4">ایجاد حساب کاربری</p>

      <p className="text-[16px] text-[#A6A6A6]">
        {step === 1
          ? "لطفا شماره موبایل یا ایمیل خود را وارد کنید"
          : step === 2
            ? "رمز یکبار مصرف را وارد کنید"
            : "لطفا یک رمز عبور تنظیم کنید"}
      </p>

      <Formik
        initialValues={{ email: "", otp: "", password: "", passwordRepeat: "" }}
        onSubmit={(values, { setFieldError }) => {
          if (step === 1) {
            setEmail(values.email);
            setStep(2);
            console.log("step 1 success");
          }

          if (!values.otp) return;
          if (step === 2 && values.otp === "000000") {
            setOtp(values.otp);
            setStep(3);
          } else {
            setFieldError("otp", "رمز یکبار مصرف به نادرستی وارد شده است");
          }

          if (values.password === values.passwordRepeat) {
            setPassword(values.password);
            // setStep(4);
          } else {
            setFieldError("passwordRepeat", "رمزها با یکدیگر مطابقت ندارند");
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-[80%] flex flex-col">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Field
                  type="text"
                  name="email"
                  placeholder="ایمیل یا شماره تماس"
                  className="h-12 w-full rounded-xl mt-4 indent-12 outline-[#0CBDE2] caret-[#0CBDE2]
             bg-[url('/public/images/user.png')] bg-no-repeat bg-position-[97%] bg-[#F4F4F4]"
                />
                <ErrorMessage
                  component="p"
                  name="email"
                  className="mt-2 text-[#0CBDE2] text-[12px] indent-2"
                />
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div
                  data-otp="true"
                  className="w-full mt-4 flex flex-col items-center justify-around"
                >
                  <OtpInput
                    value={values.otp}
                    onChange={(value) => setFieldValue("otp", value)}
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
                  <ErrorMessage
                    component="p"
                    name="otp"
                    className="text-[#0CBDE2] text-[12px] mt-2"
                  />
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <Field
                  type="text"
                  name="password"
                  placeholder="رمز عبور"
                  className="h-12 w-full rounded-xl mt-4 mb-2 indent-12 outline-[#0CBDE2] caret-[#0CBDE2]
             bg-[url('/public/images/password.png')] bg-no-repeat bg-position-[97%] bg-[#F4F4F4]"
                />
                <ErrorMessage
                  component="p"
                  name="password"
                  className="text-[#0CBDE2] text-[12px] indent-2"
                />
                <Field
                  type="text"
                  name="passwordRepeat"
                  placeholder="تکرار رمز عبور"
                  className="h-12 w-full rounded-xl mt-2  indent-12 outline-[#0CBDE2] caret-[#0CBDE2]
             bg-[url('/public/images/password.png')] bg-no-repeat bg-position-[97%] bg-[#F4F4F4]"
                />
                <ErrorMessage
                  component="p"
                  name="passwordRepeat"
                  className="mt-2 text-[#0CBDE2] text-[12px] indent-2"
                />
              </>
            )}

            <button
              type="submit"
              className="h-12 w-full mt-4 font-bold! text-white bg-[#0CBDE2] flex items-center justify-center rounded-xl cursor-pointer"
            >
              {step === 1
                ? "ارسال کد یکبار مصرف"
                : step === 2
                  ? "تایید کد یکبار مصرف"
                  : "ثبت‌نام"}
            </button>
          </Form>
        )}
      </Formik>

      {(step === 1 || step === 3) && (
        <div className="flex flex-row justify-center mt-6 mb-8 ">
          <p>حساب کاربری دارید؟</p>
          <Link className="mr-2 text-[#0CBDE2]" to="/login">
            وارد شوید
          </Link>
        </div>
      )}

      {step === 2 && time > 0 && (
        <div className="h-6 w-fit mt-4 mb-8 p-2">
          {minute}:{second.toString().padStart(2, "0")}
        </div>
      )}

      {step === 2 && time === 0 && (
        <button
          onClick={() => {
            setTime(120);
          }}
          className="h-6 w-fit mt-4 mb-8 p-2 font-bold! text-sm text-[#454545] hover:text-black rounded-sm cursor-pointer"
        >
          ارسال مجدد کد
        </button>
      )}
    </>
  );
};

export default SignUp;
