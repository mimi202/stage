import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Logout from "./pages/logout";
import QuizPage from "./pages/quizPage";
import Start from "./pages/grtStarted";
import "./App.css";

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
        </Routes>
      </main>
      <footer
        className="text-white text-center mt-5"
        style={{ backgroundColor: "#2c3e50", height: "300px", width: "100vw" }}
      >
        <div className="container-fluid py-4">
          <p className="mb-0 fw-bold">Plateforme de Quiz en Cybersécurité</p>
          <p className="mb-0">
            Ministère de l'Éducation Nationale, Préscolaire et Sport (MENPS) -
            Maroc
          </p>
          <p className="mb-0">
            Un projet pour renforcer les compétences en cybersécurité.
          </p>

          <div className="social-icons mt-3">
            <a
              href="https://www.facebook.com/MENPSmaroc"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://twitter.com/MENPSmaroc"
              className="text-white mx-2"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/menps-maroc"
              className="text-white mx-2"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>

          <p className="mt-3 mb-0">© 2025 MENPS | Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
