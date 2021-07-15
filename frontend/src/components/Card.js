import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
    const cardData = props.cardData;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.cardData.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
    );
    const isLiked = cardData.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

    function handleClick() {
        props.onCardClick(cardData);
        // console.log(cardData);
    }

    function handleLikeClick() {
        props.onCardLike(cardData);
        // console.log(cardData);
    }

    function handleDeleteClick() {
        props.onDeleteClick(cardData);
        // console.log(cardData);
    }

    return (
        <li key={props.cardData.id} className="gallery__element">
            <figure className="card">
                <img
                    className="card__photo"
                    src={cardData.link}
                    alt={cardData.name}
                    onClick={handleClick}
                />

                <figcaption className="card__caption">
                    <h2 className="card__caption-title">{cardData.name}</h2>
                    <div className="card__likes-container">
                        <button 
                        type="button" 
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick} 
                        >
                        </button>
                        <span className="card__likes-count">{cardData.likes.length}</span>
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