import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { forgetGmail, forgetNewPassWord } from "../../core/services/authService/authService";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const GoToHome = () => {
    navigate("/");
  };

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  let validationSchema;
  if (step === 1) {
    validationSchema = Yup.object({
      email: Yup.string().required("ایمیل یا شماره تماس نمی‌تواند خالی باشد"),
    });
  } else if (step === 2) {
    validationSchema = Yup.object({
      password: Yup.string().required("رمز عبور نمی‌تواند خالی باشد"),
      otp: Yup.string().required("کد یکبار مصرف نمی‌تواند خالی باشد"),
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
        style={{ height: "180px", marginTop: "32px", cursor: "pointer" }}
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
            : "لطفا یک رمز عبور جدید تنظیم کنید"}
      </p>

      <Formik
        initialValues={{ email: "", otp: "", password: "",}}
        onSubmit={async (values, { setFieldError }) => {
          if (step === 1) {
            try {
              const response = await forgetGmail({
                email: values.email,
                baseUrl: "http://localhost:5173/Auth/forget-password",
              });
              console.log(response);
              console.log(response.data);
              setEmail(values.email);
              setStep(2);
            } catch (error) {
              setFieldError(
                "email",
                error.response?.data?.message ||
                  "رمز یکبار مصرف به نادرستی وارد شده است",
              );
            }
          }
          if (step === 2 ) {
            try {
              const response = await forgetNewPassWord({
                gmail: email,
                newPassword: values.password,
                resetValue: values.otp,
              });
              const toastId = toast.loading("در حال تغیر رمز حساب شما...");

              setTimeout(()=>{
                toast.update(toastId, {
                    render: "رمز عبور شما با موفقیت عوض شد",
                    type: "success",
                    isLoading: false,
                    autoClose: 1500,
                });
                navigate("/Auth", { replace: true });
              },2000)

              console.log(response);
              console.log(response.data);
              setPassword(values.password);
            } catch (error) {
              setFieldError(
                "otp",
                error.response?.data?.message ||
                  "رمزها با یکدیگر مطابقت ندارند",
              );
            }
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
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
                  name="otp"
                  placeholder=" رمز یکبار مصرف"
                  className="h-12 w-full rounded-xl mt-2 mb-2 indent-12
                  outline-none border border-transparent focus:border-[#0CBDE2] transition-colors duration-150 caret-[#0CBDE2]
                  bg-[url('/images/password.png')] bg-no-repeat bg-position-[97%] bg-(--input-bg)"
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
              </motion.div>
            )}

            <button
              type="submit"
              className="h-12 w-full mt-2 mb-8 font-bold! text-white bg-[#0CBDE2] flex items-center justify-center rounded-xl cursor-pointer"
            >
              {step === 1
                ? "ارسال کد یکبار مصرف"
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
    </>
  );
};

export default ForgetPassword;
