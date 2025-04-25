import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Header.css";
import logo from "../assets/images/logo-mybank.png";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src={logo} alt="Logo MyBank" />
        </div>
        <ul className="nav-list">
          <li className={`link-hover ${location.pathname === "/" ? "active" : ""}`}>
            <Link to="/" className="nav-link">
              Pessoa
            </Link>
          </li>
          <li className={`link-hover ${location.pathname === "/conta" ? "active" : ""}`}>
            <Link to="/conta" className="nav-link">
              Conta
            </Link>
          </li>
          <li className={`link-hover ${location.pathname === "/movimentacao" ? "active" : ""}`}>
            <Link to="/movimentacao" className="nav-link">
              Movimentação
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;