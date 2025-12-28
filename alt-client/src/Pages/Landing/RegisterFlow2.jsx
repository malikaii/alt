import React, { useState } from "react";
import altIcon from "../../assets/Alt.png";
import ErrorField from "../../Components/ErrorField";
import { Link } from "react-router";

function RegisterFlow2({ userId, onSuccess }) {
  const authEndpoint = import.meta.env.VITE_AUTH_API_URL;

  const [userInfo, setUserInfo] = useState({
    displayName: "",
    bio: "",
    location: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const registerProfile = async (
    userId,
    displayName,
    bio,
    location
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (
        displayName === "" ||
        bio === "" ||
        location === ""
      )
        throw new Error("Enter all fields");

      const res = await fetch(`${authEndpoint}/register/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          displayName,
          bio,
          location,
        }),
      });

      if (!res.ok) {
        const response = await res.json();
        const errorMessage = response.message;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      onSuccess(data.message)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function onChangeValue(event) {
    const { name, value } = event.target;
    setUserInfo((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit() {
    const { displayName, bio, avatarUrl, location } = userInfo;

    registerProfile(userId, displayName, bio, avatarUrl, location);

    setUserInfo({
      displayName: "",
      bio: "",
      avatarUrl: "",
      location: "",
    });

  }

  return (
    <>
      <img className="w-15 h-10" src={altIcon} alt="alt-icon" />
      <h2>Sign up to Alt</h2>

      <input
        onChange={onChangeValue}
        name="displayName"
        value={userInfo?.displayName}
        type="text"
        placeholder="Name"
        className="border-b-1"
      />
      <input
        onChange={onChangeValue}
        name="bio"
        value={userInfo?.bio}
        type="text"
        placeholder="Bio"
        className="border-b-1"
      />

      <input
        onChange={onChangeValue}
        name="location"
        value={userInfo?.location}
        type="text"
        placeholder="Location"
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
        {isLoading ? <p>Submitting...</p> : "Finish"}
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

export default RegisterFlow2;
