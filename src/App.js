import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Logout from "./pages/logout";
import ProtectedRoute from "./pages/protectedRoute";
import QuizPage from "./pages/quizPage";
import CommencerQuiz from "./pages/commencerQuiz";
function App() {
  return (
    <>
      <Navbar />
      <main className="container pt-3">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="commencerQuiz"
            element={
              <ProtectedRoute>
                <CommencerQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
