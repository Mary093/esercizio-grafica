import { useState, useMemo } from "react";
import { useProducts, type Product } from "./ProductsContext";

export default function Merch() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Lista delle categorie disponibili (memoizzata)
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ["all", ...cats];
  }, [products]);

  // Filtra i prodotti in base a search e category
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesTitle = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesTitle && matchesCategory;
    });
  }, [products, search, category]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Merch</h2>

      {/* Filtri */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Cerca prodotto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Lista prodotti */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
        {filteredProducts.map((p: Product) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <img src={p.image} alt={p.title} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
