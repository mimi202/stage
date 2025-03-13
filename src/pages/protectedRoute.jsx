import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.quiz.user);

  return user.isAuthentificated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
