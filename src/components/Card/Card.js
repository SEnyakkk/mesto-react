export function Card({ card, onCardClick }) {
  return (
    <>
      <button className="place__delete" type="button" />
      <img className="place__image" src={card.link} alt={card.name} onClick={() => onCardClick({ link: card.link, name: card.name })} />
      <div className="place__container">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__group">
          <button className="place__like" type="button" />
          <span className="place__counter" />
        </div>
      </div>
    </>
  )
}