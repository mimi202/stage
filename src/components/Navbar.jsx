import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Navbar() {
  /*  const isAuthentificated = useSelector(
    (state) => state.user.isAuthentificated
  );
  console.log(isAuthentificated); */
  return (
    <nav
      className="navbar navbar-expand-lg p-3 "
      style={{ backgroundColor: "#C5C5A9" }}
    >
      <div className="container-fluid ">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink end to="/" className="nav-link">
              <i class="fa-solid fa-house"></i>
            </NavLink>
            <NavLink end to="login" className="nav-link">
              Login
            </NavLink>
            <NavLink end to="" className="nav-link">
              Sign Up
            </NavLink>

            {/* {isAuthentificated?.user && (
              <NavLink to="profile" className="nav-link">
                Profile
              </NavLink>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}
