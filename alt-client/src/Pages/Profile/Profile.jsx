import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Components/Auth/AuthContext";
import { Link, Outlet } from "react-router";
import profile from "../../assets/profile.jpg";

function Profile() {
  const restEndpoint = import.meta.env.VITE_API_URL;

  const { user, accessToken } = useAuth();

  const fileInputRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {

    if(!accessToken) return

    async function getProfileData() {
      try {
        const res = await fetch(`${restEndpoint}/user/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        const user = await res.json();
        console.log(user);
        
        setProfilePhoto(user.avatarUrl);
      } catch (error) {
        console.log("error loading profile data");
      }
    }

    getProfileData()
  }, [restEndpoint, accessToken]);

  const tabs = [
    {
      tabTitle: "Events",
      tabLink: "",
    },
    {
      tabTitle: "Fashion",
      tabLink: "fashion",
    },
    {
      tabTitle: "Music",
      tabLink: "music",
    },
    {
      tabTitle: "Friends",
      tabLink: "friends",
    },
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    console.log(formData.getAll("photo"));

    const res = await fetch(`${restEndpoint}/profile/photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();
    setProfilePhoto(data.photoUrl); // update UI immediately
  };

  // Once user signs up, they have a choice at different alternative interests or niches
  //Those are then returned as a tab on their profile p age
  // Took groups and Media out for now
  //Events will have city, date, search filters, venue
  //To boost verification, take photo at event

  return (
    <div className="h-screen">
      <div className="flex flex-col h-1/3 justify-center items-center gap-2">
        <div className="flex flex-col gap-2">
          <img
            className="w-35 h-35 border-1 rounded-xl"
            src={profilePhoto || profile}
            alt="Profile-picture"
          />
          <button
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
            onClick={() => fileInputRef.current.click()}
          >
            Edit profile picture
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <h3>{user?.username}</h3>
      </div>
      <div className="flex h-15 justify-evenly text-center border-b-1 border-gray-200">
        {tabs.map((tab) => (
          <div className=" p-3 cursor-pointer hover:border-b-2 border-green-600 hover:font-semibold">
            <Link onClick={() => setIsActive(true)} to={tab.tabLink}>
              {tab.tabTitle}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
