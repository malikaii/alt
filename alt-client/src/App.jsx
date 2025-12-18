import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Pages/Home/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="events" element={<Events />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App
