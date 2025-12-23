import React from 'react'
import { useNavigate } from 'react-router';

function RegisterFlow3({complete}) {
  const navigate = useNavigate();
  return (
    <>
      <h3>{complete}</h3>
      <button
        className="
    bg-green-600
    hover:bg-green-700
    focus:ring-4
    focus:ring-blue-300
    text-white
    rounded-md
    px-4 py-2.5
    text-sm
    font-medium
  "
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </>
  );
}

export default RegisterFlow3;   