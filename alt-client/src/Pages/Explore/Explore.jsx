import React from 'react'
import Tabs from '../../Components/Navigation/Tabs';
import { Outlet } from 'react-router';

function Explore() {

    const tabNavigation = [
      {
        tabTitle: "Trending",
        tabNavLink: "trending",
      },
      {
        tabTitle: "Groups",
        tabNavLink: "",
      },
    ];
  return (
    <div>
      <Tabs tabList={tabNavigation} />
      <Outlet/>
    </div>
  );
}

export default Explore