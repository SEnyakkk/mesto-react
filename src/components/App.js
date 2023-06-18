
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";
import { PopupImage } from "./ImagePopup/ImagePopup";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}


      />
      <Footer />

      <PopupWithForm
        name={`profile`}
        title={`Редактировать профиль`}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          minLength={2}
          maxLength={40}
          required=""
          className="form__data form__data_user_name"
          name="username"
          placeholder="Ведите имя"
        />
        <span className="popup__invalid popup__invalid_username" />
        <input
          type="text"
          minLength={2}
          maxLength={200}
          required=""
          className="form__data form__data_user_job"
          name="userjob"
          placeholder="О себе"
        />
        <span className="popup__invalid popup__invalid_userjob" />
      </PopupWithForm>

      <PopupWithForm
        name={`place`}
        title={`Новое место`}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          maxLength={30}
          minLength={2}
          required=""
          className="form__data form__data_user_place "
          name="userplace"
          placeholder="Название"
        />
        <span className=" popup__invalid popup__invalid_userplace " />
        <input
          type="url"
          required=""
          className="form__data form__data_user_url "
          name="userurl"
          placeholder="Ссылка на картинку"
        />
        <span className=" popup__invalid popup__invalid_userurl " />
      </PopupWithForm>

      <PopupWithForm
        name={`avatar`}
        title={`Обновить аватар`}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          required=""
          className="form__data form__data_user_url "
          name="avatar"
          placeholder="Ссылка на картинку"
        />
        <span className=" popup__invalid popup__invalid_avatar " />
      </PopupWithForm>

      <PopupWithForm
        name={`delete`}
        title={`Вы уверены?`}
        onClose={closeAllPopups}
      />

      <PopupImage
        onClose={closeAllPopups} />
    </>

  );
}

export default App;
