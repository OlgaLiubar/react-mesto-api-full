import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="edit-userpick"
            onClose={props.onClose}
            isOpen={props.isOpen}
            title="Обновить аватар"
            button="Сохранить"
            onSubmit={handleSubmit}
            isEditAvatarPopupOpen={props.isOpen}
            closeAllPopups={props.onClose}
        >
            <input
                id="userpick-link"
                type="url"
                className="form__input form__input_type_img-url"
                name="url"
                placeholder="https://somewebsite.com/someimage.jpg"
                required
                ref={avatarRef}
            />

            <span id="userpick-link-error" className="error"></span>
        </PopupWithForm>
    );

}

export default EditAvatarPopup;