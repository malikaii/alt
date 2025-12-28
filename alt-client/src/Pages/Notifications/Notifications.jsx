import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import Notification from "../../Components/Notification";
import { io } from "socket.io-client";
import DataContainer from "../../Components/DataContainer";

function Notifications() {
  const restEndpoint = import.meta.env.VITE_API_URL;

  const [notificationList, setNotificationList] = useState([]);


  const { user, accessToken } = useAuth();



  useEffect(() => {
    async function getNotifications() {
      const res = await fetch(`${restEndpoint}/notifications`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log("data: ", data);
      
      setNotificationList(data)

    }

    getNotifications();

  }, [accessToken, restEndpoint]);

  async function acceptRequest(actorId) {
    
        try {
      const res = await fetch(`${restEndpoint}/accept`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requesterId: actorId }),
        credentials: "include",
      });
      const data = await res.json();

      console.log("Response", data.message);
    } catch ({ message }) {
    //   setError(message);
    console.log(message);
    
    }
  }

  return (
    <div className="ml-10 mt-10">
      <h3>Notifications</h3>
      <div>
        {notificationList && (
          <DataContainer>
            {notificationList?.map((notif, i) => (
              <>
                <div
                  key={i}
                  className="h-20 flex items-center border-1 rounded-xl p-2 gap-2"
                >
                  <img src="" alt="user-pic" />
                  <h4>{notif.username}</h4>
                  <p>{notif.message}</p>
                  {notif.status === "pending" && (
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
                      onClick={() => acceptRequest(notif.requester_id)}
                    >
                      Accept request
                    </button>
                  )}
                  {notif.status === "accepted" && <span>✔ Friends</span>}
                </div>
              </>
            ))}
          </DataContainer>
        )}
      </div>
    </div>
  );
}

export default Notifications;
