import "./App.css";
import Navbar from "./components/Navbar";
import Meals from "./assets/meals.2971f633.jpg";
import MealList from "./components/MealList.tsx"
import { useState } from 'react';
import Modale from "./components/Modale";
import CartContent from "./components/CartContent";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserProvider } from "./components/UserProvider";
import { ThemeProvider } from "./components/ThemeContext";
import { ProductsProvider } from "./components/ProductsContext";


export default function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartItemsCount = 3;

  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);

  return (
    <ThemeProvider>
    <UserProvider>
    <ProductsProvider>
      <BrowserRouter>
        <Navbar cartItems={cartItemsCount} onShowCart={showCartHandler} />

        {cartIsShown && (
          <Modale onClose={hideCartHandler}>
            <CartContent onClose={hideCartHandler} />
          </Modale>
        )}

        <main>
          <div className="main-image-container">
            <img src={Meals} alt="Buffet con piatti vari" />
          </div>

          <section className="summary">
            <h2>Delicious Food, Delivered To You</h2>
            <p>
              Choose your favorite meal from our broad selection of available
              meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
              All our meals are cooked with high-quality ingredients, just-in-time
              and of course by experienced chefs!
            </p>
          </section>

          <MealList />
          <AppRouter />
        </main>
      </BrowserRouter>
      </ProductsProvider>
    </UserProvider>
    </ThemeProvider>
  );
}