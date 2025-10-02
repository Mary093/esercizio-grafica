import React, { useState } from 'react';
import type { FormEvent } from 'react'; 
import { useUserContext } from './UserContext'; 

interface FormData {
  username: string;
  email: string;
}

interface RegistrationFormProps {
    onClose: () => void;
} // <--- QUESTA GRAFFA CHIUSA MANCAVA ED ERA LA CAUSA DELL'ERRORE

export function RegistrationForm({ onClose }: RegistrationFormProps) {
  // Ottieni la funzione di login dal contesto utente
  const { login } = useUserContext();

  // Stato per i campi del form
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
  });
  // Stato per la checkbox dei termini e condizioni
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  // Stato per il messaggio di errore di validazione
  const [submissionError, setSubmissionError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(e.target.checked);
    if (e.target.checked) {
      setSubmissionError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    // Impedisce l'invio predefinito del form
    e.preventDefault();

    // Validazione dei campi di testo
    if (!formData.username.trim() || !formData.email.trim()) {
        setSubmissionError("Per favore compila tutti i campi richiesti.");
        return;
    }

    // Validazione della Checkbox
    if (!isTermsAccepted) {
      setSubmissionError("Devi accettare i termini e condizioni per registrarti.");
      return; 
    }

    // Se la validazione ha successo:
    setSubmissionError(''); 

    // Esegue il login
    login(formData.username); 

    console.log('Registrazione completata e utente loggato:', formData.username);

    alert(`Registrazione completata per l'utente: ${formData.username}. Sei stato loggato!`);

    // Chiude la modale dopo l'invio riuscito
    onClose(); 
    
    // Reset del form
    setFormData({ username: '', email: '' });
    setIsTermsAccepted(false);
  };

  return (
    <div style={{ padding: '20px', margin: '20px auto', maxWidth: '400px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Form di Registrazione</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
            {/* Campo Username */}
            <div>
                <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username:</label>
                <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>

            {/* Campo Email */}
            <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>

            {/* Checkbox 'Accetto i termini e condizioni' */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={handleCheckboxChange}
                style={{ marginRight: '10px' }}
                />
                <label htmlFor="terms">Accetto i termini e condizioni</label>
            </div>
            
            {/* Messaggio di errore */}
            {submissionError && (
                <p style={{ color: 'red', fontSize: '0.9em', margin: '0' }}>
                {submissionError}
                </p>
            )}

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
                    marginTop: '5px' 
                }}
            >
                Registrati
            </button>
        </form>
    </div>
  );
}