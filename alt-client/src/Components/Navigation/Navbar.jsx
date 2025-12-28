import React from 'react'
import { Link } from 'react-router';
import altIcon from '../../assets/Alt.png'
import { useAuth } from '../Auth/AuthContext';

function Navbar() {

  const { user, logout } = useAuth();

  return (
    <nav className="w-1/4 m-3 flex justify-center">
      <div>
        <ul className="space-y-5 text-[20px]">
          <img className="w-15 h-10" src={altIcon} alt="alt-icon" />

          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/home">
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/explore">
              <i class="fa fa-search" aria-hidden="true"></i> Explore
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/chat">
              <i class="fa fa-comment" aria-hidden="true"></i> Chat
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/events">
              <i class="fa fa-calendar" aria-hidden="true"></i> Events
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/notifications">
              <i class="fa fa-bell" aria-hidden="true"></i> Notifications
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to={`/${user?.username}`}>
              <i class="fa fa-user" aria-hidden="true"></i> Profile
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer ">
            <Link to="/settings">
              {" "}
              <i class="fa fa-cog" aria-hidden="true"></i> Settings
            </Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer ">
            <button onClick={logout}>
              <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;