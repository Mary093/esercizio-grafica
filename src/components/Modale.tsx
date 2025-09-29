import './Modale.css'; 

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
  }
  
  function Modale({ onClose, children }: ModalProps) {
   
    return (
      <>
        <div className="backdrop" onClick={onClose} />
        <div className="modal">
          <div className="content">
            {children}
          </div>
        </div>
      </>
    );
  }
  
  export default Modale;