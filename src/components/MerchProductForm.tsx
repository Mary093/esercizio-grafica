import React, { useState } from 'react';
import type { FormEvent } from 'react'; 

// Categorie disponibili per la select multipla
const CATEGORIES = ['T-Shirt', 'Mug', 'Poster', 'Sticker', 'Felpa'];

interface FormData {
    title: string;
    price: number;
    categories: string[];
}

export function MerchProductForm() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        price: 0,
        categories: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // La select multipla restituisce un HTMLCollectionOf<Option>
        const selectedOptions = Array.from(e.target.selectedOptions);
        
        // Mappa le opzioni selezionate per estrarne i valori (le categorie)
        const selectedCategories = selectedOptions.map(option => option.value);

        setFormData(prevData => ({
            ...prevData,
            categories: selectedCategories,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Validazione minima
        if (!formData.title.trim() || formData.price <= 0 || formData.categories.length === 0) {
            alert("Per favore compila Titolo, Prezzo (> 0) e seleziona almeno una Categoria.");
            return;
        }

        // 1. Mostra i dati selezionati in console
        console.log("--- Nuovo Prodotto Inserito ---");
        console.log("Dati del prodotto:", formData);
        console.log("Titolo:", formData.title);
        console.log("Prezzo:", formData.price.toFixed(2));
        console.log("Categorie Selezionate:", formData.categories.join(', '));
        console.log("-------------------------------");
        
        alert("Prodotto inserito con successo! Controlla la console.");

        // Opzionale: Reset del form
        setFormData({ title: '', price: 0, categories: [] });
    };

    return (
        <div style={{ padding: '20px', margin: '20px auto', maxWidth: '500px', border: '1px solid #007bff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Campo Titolo */}
                <div>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Titolo Prodotto:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Es: Maglia Logo 2024"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                {/* Campo Prezzo */}
                <div>
                    <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Prezzo (€):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="19.99"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                {/* Select Multipla Categorie */}
                <div>
                    <label htmlFor="categories" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Categorie (Select multipla):</label>
                    <select
                        id="categories"
                        name="categories"
                        multiple // <--- CHIAVE per la select multipla
                        value={formData.categories}
                        onChange={handleSelectChange}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
                    >
                        <option value="" disabled>Seleziona una o più...</option>
                        {CATEGORIES.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>Tieni premuto CTRL (o CMD) per selezionare più opzioni.</small>
                </div>

                {/* Bottone di invio */}
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        marginTop: '10px' 
                    }}
                >
                    Aggiungi Prodotto
                </button>
            </form>
        </div>
    );
}