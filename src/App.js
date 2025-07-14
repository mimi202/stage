import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import QuizPage from "./pages/quizPage";
import Start from "./pages/grtStarted";
import ResourcesPage from "./pages/ResourcesPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import AdminLogin from "./pages/adminLogin"; 

function App() {
  return (
    <>
      <Navbar />
      <main className="container pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="quiz" element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          } />
          <Route path="resources" element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="grtStarted" element={<Start />} />
          <Route path="admin-login" element={<AdminLogin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
