import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/" className="header__logo">
          90s Shop
        </Link>
      </div>

      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link to="/" className="header__link">
              Home
            </Link>
          </li>
        </ul>
        <Cart />
      </nav>
    </header>
  );
}

export default Header;
