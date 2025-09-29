import "./Modale.css";

interface CartContentProps {
  onClose: () => void;
}

function CartContent({ onClose }: CartContentProps) {
  const itemPrice = 22.99;
  const totalAmount = `$${itemPrice.toFixed(2)}`;

  return (
    <>
      <ul className="cart-items">
        <li className="cart-item-detail">
          <div className="item-info">
            <h2>Sushi</h2>
            <div className="price-info">
              <span className="price">${itemPrice.toFixed(2)}</span>
              <span className="amount">x 1</span>
            </div>
          </div>
          <div className="item-actions">
            <button className="action-button minus">—</button>
            <button className="action-button plus">+</button>
          </div>
        </li>
      </ul>

      <hr className="divider" />

      <div className="total">
        <span>Total Amount</span>
        <span className="total-amount">{totalAmount}</span>
      </div>

      <div className="actions">
        <button className="button button-close" onClick={onClose}>
          Close
        </button>
        <button className="button button-order">Order</button>
      </div>
    </>
  );
}

export default CartContent;
