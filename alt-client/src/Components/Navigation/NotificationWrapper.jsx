import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Auth/AuthContext';
import { io } from 'socket.io-client';

function NotificationWrapper() {
      const restEndpoint = import.meta.env.VITE_API_URL;
    
      const [notification, setNotification] = useState();
  const { user } = useAuth();
  const socketRef = useRef(null);

  console.log(user);

  useEffect(() => {
    if (!user) return;

    socketRef.current = io(`${restEndpoint}`, {
      // auth: { token: accessToken },
      transports: ["websocket"],
    });

    socketRef.current.emit("join", user.userId);

    socketRef.current.on("connect", () => {
      console.log("Backend connected");
    });

    socketRef.current.on("friend_request", (data) => {
      console.log("Friend request received:", data);
      setNotification(data);
    });

    socketRef.current.on("practice", (data) => {
      console.log("Friend request received:", data);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [user, restEndpoint]);


  return (
    <div>
      {notification && <Notification profileImg={"non"} data={notification} />}
    </div>
  );
}

export default NotificationWrapper;