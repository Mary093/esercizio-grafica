import { useParams } from "react-router-dom";
import { DUMMY_MEALS } from "./MealList"

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const meal = DUMMY_MEALS.find((m) => m.id === id);

  if (!meal) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Prodotto non trovato</h2>
        <p>Nessun prodotto corrisponde all'ID: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{meal.name}</h2>
      <p>{meal.description}</p>
      <p>Prezzo: €{meal.price.toFixed(2)}</p>
    </div>
  );
}