import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";
import { ImagePopup } from "./ImagePopup/ImagePopup";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup/EditAvatarPopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteCard, setDeleteCard] = useState('')
  // const [isLike, setIslike] = useState(false)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleDeleteClick(id) {
    setDeleteCard(id)
    setIsDeletePopupOpen(true)
  }

  function handleCardDelete(evt) {
    evt.preventDefault()
    setIsLoading(true)
    api.removeCard(deleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCard
        }))
        closeAllPopups()
        setIsLoading(false)
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addlike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          // setIslike(true)
        })
        .catch(console.error);
    } else {
      api.removelike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          // setIslike(false)
        })
        .catch(console.error);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeletePopupOpen(false)
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
        setIsLoading(false)
      })
      .catch(console.error);
  }, [])

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDelete={handleDeleteClick}
          cards={cards}
          isLoading={isLoading}
          onCardLike={handleCardLike}

        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />


        <PopupWithForm
          name={`place`}
          title={`Новое место`}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText={'Добавить'}
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
          name={`delete`}
          title={`Вы уверены?`}
          onClose={closeAllPopups}
          buttonText={'Удалить'}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
