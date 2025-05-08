import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Logout from "./pages/logout";
import QuizPage from "./pages/quizPage";
import Start from "./pages/grtStarted";
import "./App.css";
import Role from "./pages/admin/role";

function App() {
  return (
    <>
      <Navbar />
      <main className="container pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="login" element={<Login />} />
          <Route path="grtStarted" element={<Start />} />
          <Route path="role" element={<Role />} />
          <Route path="admin-login" element={<adminLogin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

/* import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Faire une requête GET vers l'API Express
    fetch("http://localhost:5000/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div className="App">
      <h1>React et Express</h1>
      <p>{message}</p>
    </div>
  );
} */

// export default App;
