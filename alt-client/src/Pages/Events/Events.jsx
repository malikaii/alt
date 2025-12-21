import React from 'react'
import Tabs from '../../Components/Navigation/Tabs';
import { Outlet } from 'react-router';

function Events() {
    const tabNavigation = [
      {
        tabTitle: "Local",
        tabNavLink: "",
      },
      {
        tabTitle: "Global",
        tabNavLink: "global",
      },
    ];

  return (
    <div>
      <Tabs tabList={tabNavigation} />
      <Outlet />
    </div>
  );
}

export default Events