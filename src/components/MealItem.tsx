import './MealList.css'; 

interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

function MealItem({ name, description, price }: MealItemProps) {
  const formattedPrice = `$${price.toFixed(2)}`; 

  return (
    <li className="meal-item">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">{formattedPrice}</div>
      </div>
      <div>
        <form className="meal-item-form">
          <div className="amount-control">
            <label htmlFor={`amount_${name}`}>Amount</label>
            <input 
              type="number" 
              id={`amount_${name}`} 
              min="1" 
              max="5" 
              step="1" 
              defaultValue="1" 
            />
          </div>
          <button type="submit" className="add-button">
            + Add
          </button>
        </form>
      </div>
    </li>
  );
}

export default MealItem;