import React, { useState } from "react";
import altIcon from "../../assets/Alt.png";
import { Link } from "react-router";
import { useAuth } from "../../Components/Auth/AuthContext";
import ErrorField from "../../Components/ErrorField";
import './Login.css'
function Login() {

  // Don't forget, set error to null when nav
  const { login, isLoading, error } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function onChangeValue(event) {
  
    const { name, value } = event.target;
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit() {
    const { username, password } = credentials;

    // if (!username || !password) {
    //   throw new Error("Enter all fields!");
    // }

    login(username, password);

    setCredentials({
      username: "",
      password: "",
    });
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="min-h-50 flex flex-col items-center gap-5">
          <img className="w-15 h-10" src={altIcon} alt="alt-icon" />
          <h2>Login to Alt</h2>

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
            {isLoading ? <p>Loading</p> : "Login"}
          </button>

          {error && <ErrorField errorMessage={error} />}

          <footer>
            <h3>
              Dont have an account?{" "}
              <Link to="/register">Click here to sign up</Link>
            </h3>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
