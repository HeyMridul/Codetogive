import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-white">
      <div className="container-fluid px-4">
        <Link to="/" className="navbar-brand text-primary">
          PriDix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse px-auto"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item text-center">
              <Link
                to="/about"
                className={`nav-link ${
                  pathname == "/about" ? "text-primary-emphasis" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li className="nav-item text-center">
              <Link
                to="/pricing"
                className={`nav-link ${
                  pathname == "/pricing" ? "text-primary-emphasis" : ""
                }`}
              >
                Subscription
              </Link>
            </li>
            <br />
            <li className="text-center">
              {props.user ? (
                <Link
                  to="/profile"
                  className="d-flex h-100 align-items-center mx-3"
                >
                  <i className="bi bi-person-vcard-fill fs-3 text-primary-emphasis" />
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary fw-bold mx-3">
                  Sign-in
                </Link>
              )}
            </li>
            <li className="text-center">
              {props.user ? (
                <Link
                  to="/profile"
                  className="d-flex h-100 align-items-center mx-3"
                >
                  <i className="bi bi-person-vcard-fill fs-3 text-primary-emphasis" />
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary fw-bold mx-3">
                  Log-in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
