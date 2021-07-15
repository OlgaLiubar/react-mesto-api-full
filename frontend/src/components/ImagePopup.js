import React from "react";

function ImagePopup({ 
    card, 
    onClose, 
    isOpen, 
    name}) {
    // console.log(props.card.link);
    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscClose = (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        };
        document.addEventListener("keydown", handleEscClose);
        return () => {
          document.removeEventListener("keydown", handleEscClose);
        };
      }, [isOpen, onClose]);
    
      const handleOverlayClose = (event) => {
        if (event.target === event.currentTarget && isOpen) {
            onClose();
        }
      };

    return (
        <div 
        className={isOpen ? `popup popup_opened popup-${name}` : `popup popup-${name}`}
        onMouseDown={handleOverlayClose}
        >
            <div className="popup__container-image">
                <img src={`${card.link}`} alt="#" className="popup__card-image" />
                <p className="popup__caption">{card.name}</p>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;





