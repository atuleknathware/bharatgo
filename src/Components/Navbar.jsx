import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!cartOpen);
  const [loggedEmail, setLoggedEmail] = useState(
    localStorage.getItem("loggedEmail")
  );

  const products = useSelector((state) => state.product.items);
  const handleLogout = () => {
    if (confirm("Do you really want to logout?")) {
      localStorage.removeItem("loggedEmail");
      setLoggedEmail("");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          Shopping
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {["all", "clothess", "electronics", "furniture", "shoes"].map(
              (cat) => (
                <li className="nav-item" key={cat}>
                  <NavLink
                    to={`/${cat}`}
                    onClick={() => setArea(cat)}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {cat}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <ul className="navbar-nav d-flex align-items-center ms-3">
            {/* <li className="nav-item me-3 text-muted d-none d-lg-inline">
              {localStorage.getItem("loggedEmail")}
            </li> */}
            {loggedEmail && (
              <li className="nav-item dropdown me-3 text-muted d-none d-lg-inline">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {loggedEmail}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/account">
                      Account
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {!loggedEmail && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link position-relative" onClick={toggleCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {products.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <CartSidebar isOpen={cartOpen} toggleCart={toggleCart} />
    </nav>
  );
};

export default Navbar;
