import React from 'react';

function InfoTooltip({ caption, icon, isOpen, onClose }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="tooltip">
                <button className="popup__close-button" onClick={onClose} type="button" />
                <div className={`tooltip__icon tooltip__icon_type_${icon}`}></div>
                <p className="tooltip__caption">{caption}</p>
            </div>
        </div>
        
    )
}

export default InfoTooltip;