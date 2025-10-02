import { useState} from 'react';
import type { FormEvent } from 'react'; 
import type { ChangeEvent } from 'react';

interface FileData {
    file: File | null;
    fileName: string;
    fileUrl: string | null; // URL temporaneo per l'anteprima
}

export function ImageUploaderForm() {
    const [fileData, setFileData] = useState<FileData>({
        file: null,
        fileName: '',
        fileUrl: null,
    });
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            // 1. Creazione dell'URL temporaneo per l'anteprima
            const url = URL.createObjectURL(file);

            setFileData({
                file: file,
                fileName: file.name,
                fileUrl: url,
            });
            setSubmissionMessage(null); // Pulisce eventuali messaggi precedenti

        } else {
            // Se l'utente annulla la selezione o non seleziona nulla
            if (fileData.fileUrl) {
                // Rilascia la memoria dell'URL precedente se esiste
                URL.revokeObjectURL(fileData.fileUrl);
            }
            setFileData({ file: null, fileName: '', fileUrl: null });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!fileData.file) {
            setSubmissionMessage("Per favore, seleziona un file immagine da caricare.");
            return;
        }

        // 2. Invio dei dati in console
        console.log("--- Dati del Caricamento Immagine ---");
        console.log("Nome del File:", fileData.fileName);
        console.log("Oggetto File (per il backend):", fileData.file);
        console.log("Dimensione (Bytes):", fileData.file.size);
        console.log("Tipo MIME:", fileData.file.type);
        console.log("-------------------------------------");
        
        setSubmissionMessage(`Immagine "${fileData.fileName}" pronta per l'invio in console!`);

        // Nota importante: Per l'invio reale (es. a un server) useresti l'oggetto `fileData.file` all'interno di un oggetto FormData.

        // Opzionale: Rilascio l'URL dopo l'invio se non vogliamo più l'anteprima
        // if (fileData.fileUrl) {
        //     URL.revokeObjectURL(fileData.fileUrl);
        // }
    };

    return (
        <div style={{ padding: '20px', margin: '20px auto', maxWidth: '600px', border: '1px solid #dc3545', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Input File */}
                <div>
                    <label htmlFor="imageFile" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Seleziona Immagine:</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*" // Accetta solo file di tipo immagine
                        onChange={handleFileChange}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                    />
                </div>

                {/* Bottone di invio */}
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    Invia Dati (vedi console)
                </button>
            </form>
            
            {/* Messaggio e Anteprima */}
            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                {submissionMessage && (
                    <p style={{ color: fileData.file ? '#28a745' : 'red', fontWeight: 'bold' }}>
                        {submissionMessage}
                    </p>
                )}
                
                {/* Anteprima dell'immagine */}
                {fileData.fileUrl && (
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Anteprima:</p>
                        <img 
                            src={fileData.fileUrl} 
                            alt={`Anteprima di ${fileData.fileName}`} 
                            style={{ maxWidth: '100%', maxHeight: '300px', border: '2px solid #ddd', borderRadius: '6px' }}
                        />
                        <p style={{ fontSize: '0.9em', color: '#555' }}>Nome file: **{fileData.fileName}**</p>
                    </div>
                )}
            </div>
        </div>
    );
}