export function PopupImage({ onClose }) {
    return (
        <div className="popup popup_zoom">
            <figure className="popup__figure-popup">
                <button className="button popup__close-button " type="button" onClick={onClose} />
                <img className="popup__figure-image" src="#" alt="#" />
                <figcaption className="popup__figure-caption" />
            </figure>
        </div>
    )
}