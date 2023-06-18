
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";


function App() {
  function handleEditAvatarClick() {
    document.querySelector('.avatar-popup').classList.add('popup_opened')
  }

  function handleEditProfileClick() {
    document.querySelector('.profile-popup').classList.add('popup_opened')
  }

  function handleAddPlaceClick() {
    document.querySelector('.element-popup').classList.add('popup_opened')
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
      <div className="popup profile-popup">
        <div className="popup__container">
          <button className="popup__close-button" type="button" />
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="form" name="profile-editform" noValidate="">
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
            {/* form__data_user_name и form__data_user_job классы для определения в JS*/}
            <input type="submit" className="form__save" defaultValue="Сохранить" />
          </form>
        </div>
      </div>
      <div className="popup element-popup">
        <div className="popup__container">
          <button className="popup__close-button" type="button" />
          <h2 className="popup__title">Новое место</h2>
          <form className="form" name="place-editform" noValidate="">
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
            {/* form__data_user_place и form__data_user_url классы для определения в JS*/}
            <input type="submit" className="form__save " defaultValue="Создать" />
          </form>
        </div>
      </div>
      <div className="popup avatar-popup">
        <div className="popup__container">
          <button className="popup__close-button" type="button" />
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="form" name="avatar-editform" noValidate="">
            <input
              type="url"
              required=""
              className="form__data form__data_user_url "
              name="avatar"
              placeholder="Ссылка на картинку"
            />
            <span className=" popup__invalid popup__invalid_avatar " />
            <input type="submit" className="form__save" defaultValue="Сохранить" />
          </form>
        </div>
      </div>
      <div className="popup delete-popup">
        <div className="popup__container">
          <button className="popup__close-button" type="button" />
          <h2 className="popup__title popup__title_type_delet">Вы уверены?</h2>
          <form className="form" name="delet-card" noValidate="">
            <input type="submit" className="form__save" defaultValue="Да" />
          </form>
        </div>
      </div>
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
