import React from 'react'
import Tabs from '../../Components/Navigation/Tabs';
import { Outlet } from 'react-router';

function Home() {

  const tabNavigation = [
    {
      tabTitle: "Feed",
      tabNavLink: "",
    },
    {
      tabTitle: "Friends",
      tabNavLink: "friends",
    }
  ];

  return (
    <div>
      <Tabs tabList={tabNavigation} />
      <Outlet />
    </div>
  );
}

export default Home