import React from "react";
import { useState } from "react";
import LoginStep1 from "./LoginStep1";
import LoginStep2 from "./LoginStep2";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStep1Success = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setStep(2);
  };

  return (
    <>
      {step === 1 && <LoginStep1 onSuccess={handleStep1Success} />}
      {step === 2 && <LoginStep2 email={email} password={password} />}
    </>
  );
};

export default Login;
