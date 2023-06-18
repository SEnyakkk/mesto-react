import { useEffect, useState } from "react"
import { api } from "../../utils/api"

export function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        dataCard.forEach(data => data.maid = dataUser.id)
      })
      .catch(console.error);
  })

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__nav">
          <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}>
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
          </button>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__info-title">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <h2 className="profile__info-subtitle">{userDescription}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} />
      </section>
      <template className="place-template" />
      <section className="elements" aria-label="ваш фотоальбом">
        <ul className="elements__list"></ul>
      </section>

    </main>
  )

}