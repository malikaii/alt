import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import DataContainer from "../../Components/DataContainer";

function Friends() {
  const restEndpoint = import.meta.env.VITE_API_URL;

  const [existingUsers, setExistingUsers] = useState([]);
  const [error, setError] = useState();

  const { accessToken } = useAuth();

  useEffect(() => {
    
    if (!accessToken) return;

    async function getExistingUsers() {
      try {
        const res = await fetch(`${restEndpoint}/users/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
          },
          credentials: "include"
        });

        if (!res.ok) {
          console.log(await res.json());
        }

        const data = await res.json();
        console.log(data);

        setExistingUsers(data);
      } catch ({ message }) {
        setError(message);
      }
    }

    getExistingUsers();
  }, [accessToken, restEndpoint]);

  async function sendRequest(userId) {
    console.log(userId);
    
    try {
      const res = await fetch(`${restEndpoint}/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addresseeId: userId }),
        credentials: "include",
      });
      const data = await res.json();

      console.log("Response", data.message);
    } catch ({ message }) {
      setError(message);
    }
  }
  return (
    <DataContainer>
      <h3>Explore other accounts</h3>
      {existingUsers ? (
        existingUsers.map((user, i) => (
          <>
            <div
              key={i}
              className="h-20 flex items-center border-1 rounded-xl p-2 gap-2"
            >
              <img src="" alt="user-pic" />
              <h4>{user.username}</h4>
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
                onClick={() => sendRequest(user.id)}
              >
                Send a request
              </button>
            </div>
          </>
        ))
      ) : (
        <></>
      )}
    </DataContainer>
  );
}

export default Friends;
