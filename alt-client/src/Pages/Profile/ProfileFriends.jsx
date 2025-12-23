import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";

function ProfileFriends() {
  const restEndpoint = import.meta.env.VITE_API_URL;

  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const getFriendsList = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`${restEndpoint}/friends`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errormsg = await res.json();
          console.log("Error", errormsg);
        }
        const list = await res.json();

        setFriendsList(list);
      } catch ({ message }) {
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    getFriendsList();
  }, [accessToken, restEndpoint]);

  return (
    <>
      <div className="m-5 flex flex-col gap-5">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          friendsList.map((friend, i) => (
            <div
              key={i}
              className="h-20 flex items-center border-1 rounded-xl p-2 gap-2"
            >
              <img src="" alt="friend-pic" />
              <h4>{friend.username}</h4>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProfileFriends;
