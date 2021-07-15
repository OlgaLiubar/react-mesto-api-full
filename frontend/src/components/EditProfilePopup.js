import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        // console.log(currentUser.name);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            isOpen={props.isOpen ? "popup_is-opened" : ""}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="edit-profile"
            title="Редактировать профиль"
            button="Сохранить"
        >
            <input
                id="name-user"
                minLength="2"
                maxLength="40"
                type="text"
                name="name"
                className="form__input form__input_type_name"
                required
                onChange={handleNameChange}
                placeholder="Имя"
                value={name} 
            />

            <span id="name-user-error" className="error"></span>

            <input
                id="occupation"
                minLength="2"
                maxLength="200"
                type="text"
                name="occupation"
                className="form__input form__input_type_occupation"
                required
                onChange={handleDescriptionChange}
                placeholder="О себе"
                value={description}
            />
            <span id="occupation-error" className="error"></span>
        </PopupWithForm>
    );

}

export default EditProfilePopup;







