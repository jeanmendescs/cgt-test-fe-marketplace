import { Link } from "react-router-dom";
import "./Header.scss";

interface HeaderProps {
  cartItemsCount?: number;
}

function Header({ cartItemsCount = 0 }: HeaderProps) {
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
          <li className="header__menu-item">
            <Link to="/cart" className="header__link header__link--cart">
              Cart ({cartItemsCount})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

