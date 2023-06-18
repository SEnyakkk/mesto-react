export function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__nav">
          <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}>
            <img src="#" alt="фото профиля" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__info-title"> </h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <h2 className="profile__info-subtitle"> </h2>
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