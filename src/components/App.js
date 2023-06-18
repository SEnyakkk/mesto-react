
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";


function App() {
  function handleEditAvatarClick() {
    document.querySelector('.avatar-popup').classList.add('popup_opened')
  }

  function handleEditProfileClick() {
    document.querySelector('.profile-popup').classList.add('popup_opened')
  }

  function handleAddPlaceClick() {
    document.querySelector('.place-popup').classList.add('popup_opened')
  }

  return (
    <>
      <Header />
      <Main
        onAvatar={handleEditAvatarClick}
        onProfile={handleEditProfileClick}
        onPlace={handleAddPlaceClick}

      />
      <Footer />

      <PopupWithForm
        name={`profile`}
        title={`Редактировать профиль`}
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
      />


      <div className="popup popup_zoom">
        <figure className="popup__figure-popup">
          <button className="button popup__close-button " type="button" />
          <img className="popup__figure-image" src="#" alt="#" />
          <figcaption className="popup__figure-caption" />
        </figure>
      </div>
    </>

  );
}

export default App;
