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
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<any>();

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

    setAuth(auth);
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
        console.log("confirmationResult", confirmationResult);
        setConfirmed(true);
        setConfirmationResult(confirmationResult);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    setPhoneNumber(value);
  };

  const handleConfirmationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target?.value;
    setConfirmationCode(value);
  };

  const confirm = () => {
    confirmationResult.confirm(confirmationCode).then((result: any) => {
      alert('ログイン成功')
    })
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input type="text" value={phoneNumber} onChange={handleChange} />
      <button id="sign-in-button" onClick={signin}>
        submit
      </button>
      {confirmed && (
        <div>
          <input
            type="text"
            value={confirmationCode}
            onChange={handleConfirmationCodeChange}
          />
          <button onClick={confirm}>confirm</button>
        </div>
      )}
    </div>
  );
};

export default Login;
