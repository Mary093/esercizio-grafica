import MealItem from './MealItem';
import './MealList.css';
import { DUMMY_MEALS } from "./MealList"

function MealList() {
  const mealItems = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
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