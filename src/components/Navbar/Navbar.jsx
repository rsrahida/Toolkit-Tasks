import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Əsas
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? "active" : ""}
        >
          Qeydiyyat
        </Link>
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          Giriş
        </Link>
        <Link
          to="/shopping"
          className={location.pathname === "/shopping" ? "active" : ""}
        >
          Məhsullar
        </Link>
        <Link
          to="/notification"
          className={location.pathname === "/notification" ? "active" : ""}
        >
          Xəbərdarlıq
        </Link>
      </div>
      <div className="theme-switcher">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
