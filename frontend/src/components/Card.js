import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardLike, onCardClick, onDeleteClick }) {

    function handleClick() {
        onCardClick(card);
        // console.log(cardData);
    }

    function handleLikeClick() {
        onCardLike(card);
        // console.log(cardData);
    }

    function handleDeleteClick() {
        onDeleteClick(card);
        // console.log(cardData);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isLiked = card.likes.some((i) => i === currentUser._id);
    // console.log(isLiked);
    const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
    );

    return (
        <li className="gallery__element">
            <figure className="card">
                <img
                    className="card__photo"
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick}
                />

                <figcaption className="card__caption">
                    <h2 className="card__caption-title">{card.name}</h2>
                    <div className="card__likes-container">
                        <button 
                        type="button" 
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick} 
                        >
                        </button>
                        <span className="card__likes-count">{card.likes.length}</span>
                    </div>
                </figcaption>
                <button 
                type="button" 
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick} 
                >
                </button>
            </figure>
        </li>
    );
}

export default Card;