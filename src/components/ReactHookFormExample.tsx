import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

// 1. Definisci l'interfaccia (tipo) per i dati del tuo form
interface IFormInput {
  nome: string;
  email: string;
  password: string;
}

const ReactHookFormExample: React.FC = () => {
  const {
    // Aggiungi l'interfaccia IFormInput a useForm per tipizzare i dati
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();

  // Aggiungi SubmitHandler<IFormInput> per tipizzare la funzione onSubmit
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Dati del Form inviati:", data);
    // Qui puoi gestire la logica di invio, come una chiamata API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Form di Registrazione</h2>

      {/* Campo Nome */}
      <div>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          // Il campo 'nome' è tipizzato in IFormInput
          {...register("nome")}
        />
      </div>

      {/* --- Campo Email (Obbligatorio e Valido) --- */}
      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            // Regole di validazione
            required: "L'email è obbligatoria.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Per favore, inserisci un'email valida."
            }
          })}
        />
        {/* Mostra il messaggio di errore se presente */}
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      {/* --- Campo Password (Minimo 6 Caratteri) --- */}
      <div>
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            // Regole di validazione
            required: "La password è obbligatoria.",
            minLength: {
              value: 6,
              message: "La password deve contenere almeno 6 caratteri."
            }
          })}
        />
        {/* Mostra il messaggio di errore se presente */}
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <button type="submit" style={{ marginTop: '15px' }}>Invia Form</button>
    </form>
  );
};

export default ReactHookFormExample;