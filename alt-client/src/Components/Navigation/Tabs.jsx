import React from 'react'
import { Link } from 'react-router';

function Tabs({tabList}) {


    
  return (
    <div className="flex h-15 text-center border-b-1 border-gray-200">
      {tabList ? (
        tabList.map((tabNav, i) => (
          <div key={i} className="w-1/2 p-3 hover:font-semibold hover:bg-gray-200 transition-colors duration-200 cursor-pointer hover:border-b-2 border-green-600">
            <Link to={tabNav.tabNavLink}>{tabNav.tabTitle}</Link>
          </div>
        ))
      ) : (
        <div>
            
        </div>
      )}
    </div>
  );
}

export default Tabs;