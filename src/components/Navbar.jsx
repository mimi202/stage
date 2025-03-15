import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const isAuthentificated = useSelector(
    (state) => state.quiz.user.isAuthentificated
  );
  return (
    <>
      <div>
        <div
          style={{
            backgroundColor: "#4A919E",
            height: "120px",

            position: "sticky",
            top: "0",
            width: "100%",
          }}
        >
          <img
            src="images/tr.jpg"
            alt="img"
            style={{ width: "120px", height: "120px", marginRight: "8px" }}
          />
          <span
            style={{
              fontFamily: "font-family: cursive",
            }}
          >
            Royaume du maroc Ministére de l'education nationale
          </span>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg    px-4"
        style={{ backgroundColor: "#C5C5A9" }}
      >
        <div className="container-fluid ">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink end to="/" className="nav-link">
                <i className="fa-solid fa-house"></i>
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
