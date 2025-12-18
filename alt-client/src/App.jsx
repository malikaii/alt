import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Pages/Home/Home'
import Explore from './Pages/Explore/Explore'
import Chat from './Pages/Chat/Chat'
import Events from './Pages/Events/Events'
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import Navbar from './Components/Navigation/Navbar'

function App() {

  return (
    <>
      <div className="flex h-screen">
        <Navbar />
        <div className="w-1/2 border-l-1 border-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/events" element={<Events />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App
