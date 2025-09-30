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
  
      fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Prodotto con id ${id} non trovato`);
        return res.text(); // prima leggi come testo
      })
      .then((text) => {
        if (!text) throw new Error("Prodotto vuoto");
        const data = JSON.parse(text); // poi fai parse sicuro
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  
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