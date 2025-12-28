import React from "react";
import { useAuth } from "../../Components/Auth/AuthContext";

function Feed() {
  const { user } = useAuth();

  return (
    <div>
      <h3>Welcome back, {user?.username}</h3>
    </div>
  );
}

export default Feed;
