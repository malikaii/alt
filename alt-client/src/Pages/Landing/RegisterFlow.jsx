import React, { useState } from "react";
import altIcon from "../../assets/Alt.png";
import { Link } from "react-router";
import ErrorField from "../../Components/ErrorField";


function RegisterFlow({onSuccess, onFail}) {
  const authEndpoint = import.meta.env.VITE_AUTH_API_URL;


  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false);





    const register = async (username, email, password) => {
      setIsLoading(true);
      setError(null);

      try {
        if (username === "" || password === "" || email === "")
          throw new Error("Enter all fields");

        const res = await fetch(`${authEndpoint}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          const errorMessage = errorResponse.message;
          throw new Error(errorMessage);
        }

        const data = await res.json();

        onSuccess(data.userId)

         
      } catch (error) {
        setError(error.message);
        onFail()
      } finally {
        setIsLoading(false);
      }
    };




  function onChangeValue(event) {
    const { name, value } = event.target;
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit() {
    const { username, email, password } = credentials;

    register(username, email, password);

    setCredentials({
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <>
      <img className="w-15 h-10" src={altIcon} alt="alt-icon" />
      <h2>Sign up to Alt</h2>

      <input
        onChange={onChangeValue}
        name="username"
        value={credentials?.username}
        type="text"
        placeholder="Username"
        className="border-b-1"
      />
      <input
        onChange={onChangeValue}
        name="email"
        value={credentials?.email}
        type="email"
        placeholder="Email"
        className="border-b-1"
      />
      <input
        onChange={onChangeValue}
        name="password"
        value={credentials?.password}
        type="password"
        placeholder="Password"
        className="border-b-1"
      />
      <button
        type="button"
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
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <p>Submitting...</p> : "Next"}
      </button>

      {error && <ErrorField errorMessage={error} />}

      <footer>
        <h3>
          Already have an account? <Link to="/login">Login </Link>
        </h3>
      </footer>
    </>
  );
}

export default RegisterFlow;
