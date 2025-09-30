import './Navbar.css'; 
import { NavLink } from "react-router-dom";

interface NavbarProps {
  cartItems: number;
  onShowCart?: () => void;
}

function Navbar(props: NavbarProps) {
  const { cartItems, onShowCart } = props;

  const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined);

  return (
    <header className="header">
      <h1 className="logo">React Meal</h1>

      <nav className="nav-links">
        <NavLink to="/" className={navClass} end>
          Home
        </NavLink>

        <NavLink to="/merch" className={navClass}>
          Merch
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          Profile
        </NavLink>
      </nav>

      <button className="cart-button" onClick={onShowCart}>
        <span>🛒 Your Cart</span>
        <span className="badge">{cartItems}</span>
      </button>
    </header>
  );
}

export default Navbar;