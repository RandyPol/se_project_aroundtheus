class Card {
  constructor(cardData, templateSelector, handleImageClick) {
    this._cardName = cardData.name
    this._cardLink = cardData.link
    this._cardLikes = cardData.likes.length
    this._templateSelector = templateSelector
    this._handleImageClick = handleImageClick
  }

  _getTemplate() {
    // code to get the card templategit status
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    return cardElement
  }

  _setEventListeners() {
    // code to set event listeners for the card

    // Like feature toggle
    this._cardElement
      .querySelector('.card__heart-button')
      .addEventListener('click', this._handleHeartButtonClick)

    // Erase card feature
    this._cardElement
      .querySelector('.card__trash-button')
      .addEventListener('click', this._handleTrashButtonClick)

    // Picture full modal
    this._cardElementImage.addEventListener('click', this._handleImageClick)
  }

  _handleTrashButtonClick = () => {
    // code for handling trash button click event
    this._cardElement.remove()
    // The best thing to do after deleting a card is to remove the link to the DOM element
    // It helps javascript garbage collector.
    this._cardElement = null
  }

  _handleHeartButtonClick = (evt) => {
    // code for handling heart button click event
    const heartButton = evt.target
    if (heartButton.classList.contains('card__heart-button_isActive')) {
      heartButton.classList.remove('card__heart-button_isActive')
      this._cardLikes -= 1
      this._cardElementLikes.textContent = this._cardLikes
    } else {
      heartButton.classList.add('card__heart-button_isActive')
      this._cardLikes += 1
      this._cardElementLikes.textContent = this._cardLikes
    }

    // Original code
    // evt.target.classList.toggle('card__heart-button_isActive')
  }

  generateCard() {
    // code to generate and return the card element populated with data
    this._cardElement = this._getTemplate()
    this._cardElementImage = this._cardElement.querySelector(
      '.card__column-image'
    )
    this._cardElementLikes =
      this._cardElement.querySelector('.card__heart-count')

    const cardElementTitle = this._cardElement.querySelector(
      '.card__column-image-title'
    )

    // Set listeners
    this._setEventListeners()

    // Add Content
    this._cardElementImage.alt = this._cardName
    this._cardElementImage.src = this._cardLink
    this._cardElementLikes.textContent = this._cardLikes
    cardElementTitle.textContent = this._cardName

    return this._cardElement
  }
}
export default Card
