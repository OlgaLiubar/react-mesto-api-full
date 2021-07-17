import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormWithValidation} from "../hooks/useForm";


function AddPlacePopup({onAddPlace, onClose, isOpen, isSending}) {
    const {values, handleChange, resetFrom, errors, isValid} = useFormWithValidation();

    useEffect(() => {
      resetFrom()
    }, [isOpen, resetFrom]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values);
    }


    return (
        <PopupWithForm
            name="add-image"
            title="Новое место"
            button={isSending ? "Сохранение..." : "Сохранить"}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            isDisabled={!isValid || isSending}
          >
            <input
              id="name-card"
              minLength="3"
              maxLength="200"
              type="text"
              name="name"
              placeholder="Название"
              className="form__input form__input_type_place"
              onChange={handleChange}
              value={values.name || ""}
              required 
            />
            <span id="name-card-error" className="error">
              {errors.name || ""}
            </span>

            <input id="link"
              type="url"
              className="form__input form__input_type_img-url"
              name="link"
              placeholder="Ссылка на картинку" 
              onChange={handleChange}
              value={values.link || ""}
              required 
              />

            <span id="link-error" className="error">
            {errors.link || ""}
            </span>
          </PopupWithForm>
    );

}

export default AddPlacePopup;
