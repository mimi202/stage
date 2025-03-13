import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const isAuthentificated = useSelector(
    (state) => state.quiz.user.isAuthentificated
  );
  return (
    <>
      <header>
        <div style={{ backgroundColor: "#4A919E", height: "120px" }}>
          <img
            src="images/tr.jpg"
            alt="img"
            style={{ width: "120px", height: "120px", marginRight: "8px" }}
          />
          <span>
            <p
              style={{
                fontFamily: "font-family: cursive",
              }}
            >
              Royaume du maroc
            </p>
            <p
              style={{
                fontFamily: "font-family: cursive",
              }}
            >
              Ministére de l'education nationale
            </p>
          </span>
        </div>
      </header>
      <nav
        className="navbar navbar-expand-lg p-3 mb-4  px-4"
        style={{ backgroundColor: "#C5C5A9" }}
      >
        <div className="container-fluid ">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink end to="/" className="nav-link">
                <i class="fa-solid fa-house"></i>
              </NavLink>
              <NavLink end to="login" className="nav-link mx-3">
                Connexion
              </NavLink>
              {isAuthentificated && (
                <NavLink end to="profile" className="nav-link mx-3">
                  Profile
                </NavLink>
              )}
              <NavLink end to="logout" className="nav-link  mx-3">
                Déconnexion
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
