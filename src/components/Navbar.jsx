import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isAuthentificated = useSelector(
    (state) => state.quiz.user.isAuthentificated
  );
  const user = useSelector((state) => state.quiz.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(user.isAuthentificated ? "quiz" : "login");
  };

  return (
    <>
      {/* Logo en haut */}
      <div
        className="bg-light sticky-top d-flex justify-content-center align-items-center"
        style={{ height: "120px" }}
      >
        <img
          src="images/logoM.jpg"
          alt="Logo"
          className="img-fluid"
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Navbar responsive */}
      <nav
        style={{ backgroundColor: "#5784BA" }}
        className="navbar navbar-expand-lg navbar-dark  shadow-sm sticky-top"
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand fw-bold">
            <i className="fas fa-shield-alt me-2"></i>CyberQuiz
          </NavLink>

          {/* Bouton burger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens de navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  <i className="fas fa-home me-1"></i> Accueil
                </NavLink>
              </li>
              {isAuthentificated && (
                <li className="nav-item">
                  <NavLink to="profile" className="nav-link text-white">
                    <i className="fas fa-user me-1"></i> Profil
                  </NavLink>
                </li>
              )}
              {!isAuthentificated ? (
                <li className="nav-item">
                  <NavLink to="login" className="nav-link text-white">
                    <i className="fas fa-sign-in-alt me-1"></i> Connexion
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink to="logout" className="nav-link text-white">
                    <i className="fas fa-sign-out-alt me-1"></i> Déconnexion
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <button
                  className="btn btn-light text-primary fw-bold ms-lg-3 mt-2 mt-lg-0"
                  onClick={handleNavigate}
                >
                  <i className="fas fa-play me-1"></i> Commencer le Quiz
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
