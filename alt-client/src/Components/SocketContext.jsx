// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "./AuthContext";

// const SocketContext = createContext(null);

// export function SocketProvider({ children }) {
//   const { user, authReady } = useAuth();

//   const socketRef = useRef(null);
//   const [socket, setSocket] = useState(null);

// useEffect(() => {
//   if (!authReady || !user?.id || !user?.accessToken) return;

//   // prevent double connection
//   if (socketRef.current) return;

//   const s = io("http://localhost:3000", {
//     auth: { token: user.accessToken },
//     transports: ["websocket"],
//   });

//   socketRef.current = s;
//   setSocket(s);

//   s.emit("join", user.id);

//   return () => {
//     s.disconnect();
//     socketRef.current = null;
//     setSocket(null);
//   };
// }, [authReady, user?.id, user?.accessToken]);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useSocket = () => useContext(SocketContext);


