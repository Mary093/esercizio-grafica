import './Navbar.css'; 
import { NavLink } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { useTheme } from "./ThemeContext";

interface NavbarProps {
  cartItems: number;
  onShowCart?: () => void;
  onShowRegistration: () => void;
}

function Navbar({ cartItems, onShowCart, onShowRegistration }: NavbarProps) {
  const { user, logout } = useUserContext();
  const { theme, toggleTheme } = useTheme();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : undefined;

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

      <div className="actions">
        <button className="cart-button" onClick={onShowCart}>
          <span>🛒 Your Cart</span>
          <span className="badge">{cartItems}</span>
        </button>

        {/* gestione login/logout */}
        {user ? (
          <div className="user-info">
            <span>Ciao, {user.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          // Quando l'utente non è loggato, chiama la funzione per mostrare il form di registrazione
          <button onClick={onShowRegistration} className="login-btn">
            Accedi
          </button>
        )}
        {/* toggle tema */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;