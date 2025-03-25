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
      navigate("commencerQuiz");
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
        style={{ backgroundColor: "#eee" }}
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
                  Acceuil
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
