import './Navbar.css'; 

interface NavbarProps {
  cartItems: number; 
  onShowCart?: () => void; 
}

function Navbar(props: NavbarProps) {
    const { cartItems, onShowCart } = props;
  
    return (
      <header className="header">
        <h1 className="logo">React Meal</h1>
        <button className="cart-button" onClick={onShowCart}>
          <span>🛒 Your Cart</span> 
          <span className="badge">{cartItems}</span>
        </button>
      </header>
    );
  }
  
  export default Navbar;