// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🛍️ Toko Sebelah </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
