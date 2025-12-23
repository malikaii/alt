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
import Login from "./Pages/Landing/Login";
import AuthLayout from "./AuthLayout";
import AppLayout from "./AppLayout";
import Register from "./Pages/Landing/Register";
import { AuthProvider } from "./Components/Auth/AuthContext";
import ProfileEvents from "./Pages/Profile/ProfileEvents";
import ProfileFashion from "./Pages/Profile/ProfileFashion";
import ProfileMusic from "./Pages/Profile/ProfileMusic";
import ProfileFriends from "./Pages/Profile/ProfileFriends";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />}/>

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
            <Route path="/:username" element={<Profile />}>
              <Route index element={<ProfileEvents/>} />
              <Route path="fashion" element={<ProfileFashion />} />
              <Route path="music" element={<ProfileMusic />} />
              <Route path="friends" element={<ProfileFriends />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
