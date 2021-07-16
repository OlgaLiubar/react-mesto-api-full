import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from "./Card";
import Preloader from "./Preloader";


function Main({
    cards,
    onEditProfileClick,
    onAddPlaceClick,
    onEditAvatarClick,
    onCardClick,
    onCardLike,
    onDeleteClick,
    isCardsLoading,
    isCardsError,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__user">

                    <div className="profile__userpick-container">
                        <img
                            className="profile__image"
                            src={currentUser.avatar}
                            alt="аватар"
                        />
                        <button
                            className="profile__edit-userpick-button"
                            onClick={onEditAvatarClick}>
                        </button>
                    </div>

                    <div className="profile__info-container">
                        <div className="profile__info">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <p className="profile__occupation">{currentUser.about}</p>
                        </div>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={onEditProfileClick}>
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlaceClick}>
                </button>
            </section>

            <section className="gallery">
                {isCardsLoading && (
                    <Preloader />
                )}

                {isCardsError && (
                    <p className='places__loading'>isCardsError</p>
                )}

                {!isCardsLoading && !isCardsError && (
                    <ul className="gallery__elements">
                        {cards.map((card) => (
                            <Card
                                onCardLike={onCardLike}
                                onCardClick={onCardClick}
                                onDeleteClick={onDeleteClick}
                                card={card}
                                key={card._id}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default Main;