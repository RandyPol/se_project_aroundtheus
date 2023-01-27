class Card {
  constructor(
    cardData,
    templateSelector,
    handleImageClick,
    deleteCardModal,
    currentUserId,
    handleHeartClick
  ) {
    this._cardData = cardData
    this._cardName = cardData.name
    this._cardLink = cardData.link
    this._cardLikes = cardData.likes.length
    this._cardId = cardData._id
    this._templateSelector = templateSelector
    this._handleImageClick = handleImageClick
    this._deleteCardModal = deleteCardModal
    this._currentUserId = currentUserId
    this._handleHeartClick = handleHeartClick
  }

  _getTemplate() {
    // code to get the card templategit status
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true)

    // Hide trash button if the card is not owned by the current user
    const trashButton = cardElement.querySelector('.card__trash-button')

    if (this._cardData.owner._id !== this._currentUserId) {
      trashButton.remove()
    }

    return cardElement
  }

  _setEventListeners() {
    // code to set event listeners for the card

    // Like feature toggle
    this._cardElement
      .querySelector('.card__heart-button')
      .addEventListener('click', this._handleHeartButtonClick)

    // Erase card feature
    const trashButton = this._cardElement.querySelector('.card__trash-button')
    if (trashButton) {
      trashButton.addEventListener('click', this._handleTrashButtonClick)
    }

    // Picture full modal
    this._cardElementImage.addEventListener('click', this._handleImageClick)
  }

  _handleTrashButtonClick = () => {
    // code for handling trash button click event
    this._deleteCardModal(this)
  }

  deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  _handleHeartButtonClick = () => {
    this._handleHeartClick(this)
  }

  getCardLikeStatus() {
    return this._cardLikeButton.classList.contains(
      'card__heart-button_isActive'
    )
  }

  toggleLikeButton(cardLikes) {
    this._cardLikeButton.classList.toggle('card__heart-button_isActive')
    this._cardElementLikes.textContent = cardLikes
  }

  getId() {
    return this._cardId
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

    this._cardLikeButton = this._cardElement.querySelector(
      '.card__heart-button'
    )
    // check if card is liked by user
    if (this._cardData.likes.some((like) => like._id === this._currentUserId)) {
      this._cardLikeButton.classList.add('card__heart-button_isActive')
    }
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
