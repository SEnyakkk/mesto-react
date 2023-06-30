import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm";
import { ImagePopup } from "./ImagePopup/ImagePopup";
import { useEffect, useState } from "react";
import CurrentUserContext  from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api";

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
          return card._id !==deleteCard
        }))
        closeAllPopups()
        setIsLoading(false)
      })
    .catch(console.error);
  }

//   function handleCardLike(card) {
//     const isLiked = card.likes.some(i => i._id === currentUser._id);
//     api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
//         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
//     });
// } 
  // useEffect(() => {
  //   setIslike(cards.likes.some(card => card._id === currentUser._id))
  // }, [cards.likes, card._id]) 

  function handleCardLike(card) {
    const isLike = card.likes.some(i => i._id === currentUser._id);

    if (!isLike) {
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

        <PopupWithForm
          name={`profile`}
          title={`Редактировать профиль`}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={'Сохранить'}
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
          name={`avatar`}
          title={`Обновить аватар`}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText={'Подтвердить'}
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
