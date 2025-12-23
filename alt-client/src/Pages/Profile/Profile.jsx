import React, { useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import { Link, Outlet } from "react-router";
import profile from '../../assets/profile.jpg'

function Profile() {
  const { user } = useAuth();

  const [isActive, setIsActive] = useState(false)

  const tabs = [
    {
      tabTitle: "Events",
      tabLink: ""
    },
    {
      tabTitle: "Fashion",
      tabLink: "fashion"

    },
    {
      tabTitle: "Music",
      tabLink: "music"

    },
    {
      tabTitle: "Friends",
      tabLink: "friends"

    }];

  // Once user signs up, they have a choice at different alternative interests or niches
  //Those are then returned as a tab on their profile p age
  // Took groups and Media out for now
  //Events will have city, date, search filters, venue
  //To boost verification, take photo at event

  return (
    <div className="h-screen">
      <div className="flex flex-col h-1/3 justify-center items-center gap-2">
        <img className="w-35 h-35" src={profile} alt="Profile-picture" />
        <h3>{user?.username}</h3>
      </div>
      <div className="flex h-15 justify-evenly text-center border-b-1 border-gray-200">
        {tabs.map((tab) => (
          <div className=" p-3 cursor-pointer hover:border-b-2 border-green-600 hover:font-semibold">
            <Link onClick={()=>setIsActive(true)} to={tab.tabLink}>{tab.tabTitle}</Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
