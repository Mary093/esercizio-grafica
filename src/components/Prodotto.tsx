import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProdottoData {
    id: number;
    title: string;
    description: string;
  }
  
  export default function Prodotto() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProdottoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!id) return;
  
      setLoading(true);
      setError(null);
  
      // la fetch può fallire se id non è numerico
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Errore nella fetch");
          return res.json();
        })
        .then((data) => {
          setProduct(data); // lascia il tipo inferito
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [id]);
  
    // mostra sempre qualcosa
    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;
    if (!product) return <p>Prodotto non trovato</p>;
  
    return (
      <div style={{ padding: 20 }}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
      </div>
    );
  }