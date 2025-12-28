import React, { useState } from "react";
import "./Login.css";
import RegisterFlow from "./registerflow";
import RegisterFlow2 from "./RegisterFlow2";
import RegisterFlow3 from "./RegisterFlow3";

function Register() {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null)
  const [success, setSuccess] = useState()

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="min-h-50 flex flex-col items-center gap-5">
          {step === 1 && (
            <RegisterFlow
              onSuccess={(newUserId) => {
                setUserId(newUserId);
                setStep(2);
              }}
              onFail={() => {
                console.log("Process failed due to error");
              }}
            />
          )}
          {step === 2 && (
            <RegisterFlow2
              userId={userId}
              onSuccess={(successMessage) => {
                setStep(3);
                setSuccess(successMessage)
              }}
            />
          )}

          {step === 3 && (
            <RegisterFlow3
              complete={success}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
