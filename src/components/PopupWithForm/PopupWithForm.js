export function PopupWithForm({ name, title, children, isOpen, onClose, buttonText}) {
  return (
    <div className={`popup ${name}-popup ${isOpen && 'popup_opened'}`} >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={`${name}-editform`} noValidate="">
          {children}
          <button type="submit" className="form__save">{buttonText}</button> 
        </form>
      </div>
    </div>
  )
}