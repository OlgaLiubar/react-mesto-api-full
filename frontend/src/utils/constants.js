//массив для изначальных карточек

//массив для изначальных карточек

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// валидация формы

export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    buttonInvalidSelector: 'form__save-button_invalid',
    inputInvalidSelector: 'form__input_state_invalid'
};

// кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button')
export const editUserpickButton = document.querySelector('.profile__edit-userpick-button')

// для формы "редактировать профиль"

export const popupEditForm = document.querySelector('.form_type_edit');
export const inputProfileNameElement = document.querySelector('.form__input_type_name');
export const inputProfileCaptionElement = document.querySelector('.form__input_type_occupation');

// для формы "добавить карточку"
export const popupAddForm = document.querySelector('.form_type_add');


//селекторы
export const imagePopupSelector = '.popup_type_view-image';
export const addCardPopupSelector = '.popup_type_add-image';
export const profilePopupSelector = '.popup_type_edit-profile';
export const userNameSelector = '.profile__title';
export const userInfoSelector = '.profile__occupation';
export const confirmDeletePopupSelector = '.popup_type_confirm-delete';
export const editUserpickPopupSelector = '.popup_type_edit-userpick';
export const cardListSelector = '.gallery__elements'
export const userAvatarSelector = '.profile__image';