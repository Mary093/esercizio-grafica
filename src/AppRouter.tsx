import { Routes, Route } from "react-router-dom";
// import Product from "./components/Product";
import Prodotto from "./components/Prodotto";
import PrivateRoute from "./components/PrivateRoute";
import Merch from "./components/Merch";


function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <p>Benvenuto in React Meal!</p>
    </div>
  );
}

// function Merch() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Merch</h2>
//       <p>I nostri prodotti di merchandising.</p>
//     </div>
//   );
// }

function Profile() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      <p>Il tuo profilo personale.</p>
    </div>
  );
}


function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404</h2>
      <p>Pagina non trovata.</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/merch" element={<Merch />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* <Route path="/product/:id" element={<Product />} /> */}
      <Route path="/prodotto/:id" element={<Prodotto />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
