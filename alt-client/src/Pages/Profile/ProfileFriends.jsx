import React, { useEffect, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import DataContainer from "../../Components/DataContainer";

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

  if (isLoading) {
    return (
      <>
        <div className="text-center">
          <p>Loading friends...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="h-60 flex items-center justify-center">
          <p>Unable to retrieve friends at this time. Try reloading page</p>
        </div>
      </>
    );
  }


  
  if (friendsList == null || friendsList.length === 0) {
    return (
      <>
        <div className="h-10 flex items-center justify-center">
          <p>You don't have any friends currently. Try adding someone first!</p>
        </div>
      </>
    );
  }


  return (
    <>
      <DataContainer>
        {friendsList.map((friend, i) => (
          <div className="h-20 flex items-center p-2 justify-between">
            <div key={i} className="flex items-center gap-5">
              <img
                src=""
                alt="profile"
                className="h-15 w-15 border-1 rounded-4xl"
              />
              <h3>{friend.username}</h3>
            </div>
            <div>
              <button
                className="bg-green-600
                        hover:bg-green-700
                        focus:ring-4
                         cursor-pointer
                        text-white
                        rounded-3xl
                        px-4 py-2.5
                        text-sm
                        font-small"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </DataContainer>
    </>
  );
}

export default ProfileFriends;
