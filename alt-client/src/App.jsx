import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Chat from "./Pages/Chat/Chat";
import Events from "./Pages/Events/Events";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import Navbar from "./Components/Navigation/Navbar";
import ExploreGroups from "./Pages/Explore/ExploreGroups";
import ExploreTrending from "./Pages/Explore/ExploreTrending";
import Feed from "./Pages/Home/Feed";
import Friends from "./Pages/Home/Friends";
import LocalEvents from "./Pages/Events/LocalEvents";
import GlobalEvents from "./Pages/Events/GlobalEvents";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Navbar />
        <div className="w-1/2 border-l-1 border-r-1 border-gray-200">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />}>
              <Route index element={<Feed />} />
              <Route path="friends" element={<Friends />} />
            </Route>
            <Route path="/explore" element={<Explore />}>
              <Route index element={<ExploreGroups />} />
              <Route path="trending" element={<ExploreTrending />} />
            </Route>
            <Route path="/events" element={<Events />}>
              <Route index element={<LocalEvents />} />
              <Route path="global" element={<GlobalEvents />} />
            </Route>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
