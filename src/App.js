import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
function App() {
  return (
    <>
      <Navbar />
      <main className="container pt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
