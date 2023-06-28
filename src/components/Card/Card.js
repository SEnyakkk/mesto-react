export function Card({ card, onCardClick, onCardDelete }) {
  return (
    <>
      {card.myid ===card.owner._id && <button className="place__delete" type="button" onClick={onCardDelete}/>}
      {/* <button className="place__delete" type="button" onClick={onCardDelete}/> */}
      <img className="place__image" src={card.link} alt={card.name} onClick={() => onCardClick({ link: card.link, name: card.name })} />
      <div className="place__container">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__group">
          <button className="place__like" type="button" />
          <span className="place__counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  )
}