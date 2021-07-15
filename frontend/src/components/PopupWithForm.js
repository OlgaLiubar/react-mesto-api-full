import React from 'react';


function PopupWithForm({
  title,
  name,
  isOpen,
  button,
  onSubmit,
  onClose,
  children,
  isDisabled = false,
}) {

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
        <div className={isOpen ? `popup popup_opened popup-${name}` : `popup popup-${name}`}
        onMouseDown={handleOverlayClose}
        >
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={onClose}></button>

          <form 
            onSubmit={onSubmit} 
            action="#" 
            name="edit-profile" 
            className={`form form_type_${name}`} 
            noValidate
          >
          <h2 className="form__heading">{title}</h2>
          {children}
          <button 
            type="submit" 
            // className="form__save-button"
            className={`form__save-button ${
              isDisabled && "form__save-button_invalid"
            }`}
            disabled={isDisabled}
            >
              {button}
          </button>
          </form>
        </div>
      </div>
    );
  } 

export default PopupWithForm; 