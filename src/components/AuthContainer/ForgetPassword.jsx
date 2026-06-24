import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const ForgetPassword = () => {
  const navigate = useNavigate()
  const GoToHome = (()=>{
    navigate("/")
  })

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

  const inputAnimation = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  const errorAnimation = {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "auto",
    },
    exit: {
      opacity: 0,
      height: 0,
    },
  };

  return (
    <>
      <img
        style={{ height: "180px", marginTop: "32px",cursor: "pointer" }}
        src="/images/bigLogo.png"
        title="بازگشت به صفحه اصلی"
        onClick={GoToHome}
      />
      <p className="font-bold! text-2xl mt-4 mb-4">فراموشی رمز عبور</p>

      <p
        className={
          step === 1
            ? "text-[14px] text-[#A6A6A6]"
            : "text-[16px] text-[#A6A6A6]"
        }
      >
        {step === 1
          ? "برای درخواست تغییر رمز عبور، ایمیل یا شماره تماس خود را وارد کنید"
          : step === 2
            ? "رمز یکبار مصرف را وارد کنید"
            : "لطفا یک رمز عبور جدید تنظیم کنید"}
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
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="w-[80%] flex flex-col">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key={step}
                initial={inputAnimation.initial}
                animate={inputAnimation.animate}
                exit={inputAnimation.exit}
              >
                <Field
                  type="text"
                  name="email"
                  placeholder="ایمیل یا شماره تماس"
                  className="h-12 w-full rounded-xl mt-4 mb-2 indent-12 outline-[#0CBDE2] caret-[#0CBDE2]
                  outline-none border border-transparent focus:border-[#0CBDE2] transition-colors duration-150
                  bg-[url('/images/user.png')] bg-no-repeat bg-position-[97%] bg-(--input-bg)"
                />
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={errorAnimation.initial}
                      animate={errorAnimation.animate}
                      exit={errorAnimation.exit}
                      className="text-[#0CBDE2] text-[12px] indent-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key={step}
                initial={inputAnimation.initial}
                animate={inputAnimation.animate}
                exit={inputAnimation.exit}
              >
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
                        className="h-11.5 w-11 m-0.5 mb-2 text-center text-xl bg-(--input-bg) border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#0CBDE2] caret-[#0CBDE2]"
                      />
                    )}
                    inputType="tel"
                    shouldAutoFocus={true}
                  />
                  <AnimatePresence>
                    {errors.otp && touched.otp && (
                      <motion.p
                        initial={errorAnimation.initial}
                        animate={errorAnimation.animate}
                        exit={errorAnimation.exit}
                        className="text-[#0CBDE2] text-[12px] indent-2"
                      >
                        {errors.otp}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key={step}
                initial={inputAnimation.initial}
                animate={inputAnimation.animate}
                exit={inputAnimation.exit}
              >
                <Field
                  type="text"
                  name="password"
                  placeholder="رمز عبور"
                  className="h-12 w-full rounded-xl mt-4 mb-2 indent-12
                  outline-none border border-transparent focus:border-[#0CBDE2] transition-colors duration-150
                  bg-[url('/images/password.png')] bg-no-repeat bg-position-[97%] bg-(--input-bg)"
                />
                <AnimatePresence>
                  {errors.password && touched.password && (
                    <motion.p
                      initial={errorAnimation.initial}
                      animate={errorAnimation.animate}
                      exit={errorAnimation.exit}
                      className="text-[#0CBDE2] text-[12px] indent-2"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Field
                  type="text"
                  name="passwordRepeat"
                  placeholder="تکرار رمز عبور"
                  className="h-12 w-full rounded-xl mt-2 mb-2 indent-12
                  outline-none border border-transparent focus:border-[#0CBDE2] transition-colors duration-150 caret-[#0CBDE2]
                  bg-[url('/images/password.png')] bg-no-repeat bg-position-[97%] bg-(--input-bg)"
                />
                <AnimatePresence>
                  {errors.passwordRepeat && touched.passwordRepeat && (
                    <motion.p
                      initial={errorAnimation.initial}
                      animate={errorAnimation.animate}
                      exit={errorAnimation.exit}
                      className="text-[#0CBDE2] text-[12px] indent-2"
                    >
                      {errors.passwordRepeat}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            <button
              type="submit"
              className="h-12 w-full mt-2 mb-8 font-bold! text-white bg-[#0CBDE2] flex items-center justify-center rounded-xl cursor-pointer"
            >
              {step === 1
                ? "ارسال کد یکبار مصرف"
                : step === 2
                  ? "تایید کد یکبار مصرف"
                  : "ثبت رمز عبور جدید"}
            </button>
          </Form>
        )}
      </Formik>

      {step === 1 && (
        <div className="flex flex-row justify-center mb-8 ">
          <p>حساب کاربری دارید؟</p>
          <Link className="mr-2 text-[#0CBDE2]" to="/Auth">
            وارد شوید
          </Link>
        </div>
      )}

      {step === 2 && time > 0 && (
        <div className="h-6 w-fit mb-8">
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

export default ForgetPassword;
