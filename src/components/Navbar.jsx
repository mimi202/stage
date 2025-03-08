export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">Navbar</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink end to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="courses" className="nav-link">
              Courses
            </NavLink>

            {auth?.user && (
              <NavLink to="profile" className="nav-link">
                Profile
              </NavLink>
            )}
            <NavLink to={auth?.user ? "logout" : "login"} className="nav-link">
              {auth?.user ? "Logout" : "Login"}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
