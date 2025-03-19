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
            backgroundColor: "#f7f7f7",
            height: "120px",

            position: "sticky",
            top: "0",
            width: "100%",
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
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container-fluid ">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink end to="/" className="nav-link">
                Acceuil
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
