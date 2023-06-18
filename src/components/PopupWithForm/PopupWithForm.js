export function PopupWithForm({name, title, children}) {
    return (
        <div className={`popup ${name}-popup`} >
            <div className="popup__container">
                <button className="popup__close-button" type="button" />
                <h2 className="popup__title">{title}</h2>
                <form className="form" name={`${name}-editform`} noValidate="">
                {children}
                <input type="submit" className="form__save" defaultValue="Сохранить" />
                </form>
            </div>
        </div>
    )
}