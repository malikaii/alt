import React from 'react'
import { Link } from 'react-router';
import altIcon from '../../assets/Alt.png'
import { useAuth } from '../Auth/AuthContext';

function Navbar() {

  const { user, logout } = useAuth();

  return (
    <nav className="w-1/4 m-3 flex justify-center">
      <div>
        <ul className="space-y-3 text-[25px]">
          <img className="w-15 h-10" src={altIcon} alt="alt-icon" />

          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/home">Home</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/explore">Explore</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/chat">Chat</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/events">Events</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to="/notifications">Notifications</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
            <Link to={`/${user?.username}`}>Profile</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer ">
            <Link to="/settings">Settings</Link>
          </li>
          <li className="rounded-4xl p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer ">
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;