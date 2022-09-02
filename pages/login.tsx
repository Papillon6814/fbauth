import type { NextPage } from "next";
import { app } from "../firebase/firebase";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

const Login: NextPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [auth, setAuth] = useState<any>();

  useEffect(() => {
    const auth = getAuth(app);
    auth.useDeviceLanguage();

    // @ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );

    setAuth(auth)
  }, []);

  const signin = () => {
    // @ts-ignore
    console.log("verifier", window.recaptchaVerifier);
    console.log("auth", auth);
    console.log("PN", phoneNumber);
    // @ts-ignore
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // @ts-ignore
        window.confirmationResult = confirmationResult;
        console.log("confirmationResult", confirmationResult);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    setPhoneNumber(value);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input type="text" value={phoneNumber} onChange={handleChange} />
      <button id="sign-in-button" onClick={signin}>
        submit
      </button>
    </div>
  );
};

export default Login;
