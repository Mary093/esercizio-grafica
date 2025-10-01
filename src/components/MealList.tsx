import MealItem from './MealItem';
import './MealList.css';
import { useProducts } from "./ProductsContext"; 

function MealList() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading spinner...</p>;
  if (error) return <p>Errore: {error}</p>;

  const mealItems = products.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id.toString()}
      name={meal.title}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals-container">
      <ul>
        {mealItems}
      </ul>
    </section>
  );
}

export default MealList;