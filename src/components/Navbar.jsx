/* import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isAuthentificated = useSelector(
    (state) => state.quiz.user.isAuthentificated
  );
  const user = useSelector((state) => state.quiz.user);

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (user.isAuthentificated) {
      navigate("quiz");
    } else {
      navigate("login");
    }
  };
  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#f7f7f7",
            height: "120px",
            position: "sticky",
            top: "0",
            //   zIndex: "1",

            width: "100%",
            display: "flex",
          }}
        >
          <img
            src="images/logoM.jpg"
            alt="img"
            style={{
              width: "100%",
              height: "120px",
              marginRight: "8px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg    px-4"
        style={{ backgroundColor: "#5784BA" }}
      >
        <div className="container-fluid ">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div
              className="navbar-nav"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ width: "300px", display: "flex" }}>
                <NavLink end to="/" className="nav-link">
                  <i class="fa-solid fa-house"></i> Acceuil
                </NavLink>
                {isAuthentificated && (
                  <NavLink end to="profile" className="nav-link mx-3">
                    Profile
                  </NavLink>
                )}
              </div>
              <div style={{ width: "400px", display: "flex" }}>
                {!isAuthentificated && (
                  <NavLink end to="login" className="nav-link mx-3">
                    <i
                      class="fa-solid fa-right-to-bracket"
                      style={{ marginRight: "10px" }}
                    ></i>
                    Connexion
                  </NavLink>
                )}
                {isAuthentificated && (
                  <NavLink end to="logout" className="nav-link  mx-3">
                    Déconnexion
                  </NavLink>
                )}
                <button
                  className="btn btn-secondary d-block mb-3  px-4 py-2 mx-auto text-dark "
                  style={{ background: "#F4F0E3", fontFamily: "serif" }}
                  onClick={handleNavigate}
                >
                  Commencer le Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
 */
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
    if (user.isAuthentificated) {
      navigate("quiz");
    } else {
      navigate("login");
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#f7f7f7",
          height: "120px",
          position: "sticky",
          top: "0",
          //   zIndex: "1",

          width: "100%",
          display: "flex",
        }}
      >
        <img
          src="images/logoM.jpg"
          alt="img"
          style={{
            width: "100%",
            height: "120px",
            marginRight: "8px",
            objectFit: "contain",
          }}
        />
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-dark  shadow-sm p-3 sticky-top"
        style={{ backgroundColor: "#5784BA" }}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand fw-bold text-light">
            <i className="fas fa-shield-alt me-2"></i>CyberQuiz
          </NavLink>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-light">
                  <i className="fas fa-home me-1"></i> Accueil
                </NavLink>
              </li>
              {isAuthentificated && (
                <li className="nav-item">
                  <NavLink to="profile" className="nav-link text-light">
                    <i className="fas fa-user me-1"></i> Profil
                  </NavLink>
                </li>
              )}
              {!isAuthentificated ? (
                <li className="nav-item">
                  <NavLink to="login" className="nav-link text-light">
                    <i className="fas fa-sign-in-alt me-1"></i> Connexion
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink to="logout" className="nav-link text-light">
                    <i className="fas fa-sign-out-alt me-1"></i> Déconnexion
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <button
                  className="btn btn-light text-primary fw-bold ms-3"
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
