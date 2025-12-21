import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function ErrorField({ errorMessage }) {
  // border: 2px solid #d21d10;
  // border-radius: 10px;
  // color: #d21d10;

  return (
    <div
      className="
          flex items-start gap-2
  border-2
  border-[#d21d10]
  text-[#d21d10]
  rounded-[10px]
  p-4
"
    >
      <FaExclamationCircle className="mt-0.5 shrink-0" />
      <span>{errorMessage}</span>
    </div>
  );
}

export default ErrorField;
