import { pictureModal, modalImage, modalParagraph, openPopup } from './index.js'

class Card {
  constructor(cardData, templateSelector) {
    this._cardName = cardData.name
    this._cardLink = cardData.link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    // code to get the card template
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

  _handleTrashButtonClick(event) {
    // code for handling trash button click event
    event.target.closest('.card').remove()
  }

  _handleHeartButtonClick(event) {
    // code for handling heart button click event
    event.target.classList.toggle('card__heart-button_isActive')
  }

  _handleImageClick(event) {
    // code for handling image click event
    // Insert background image
    modalImage.src = event.target.src
    modalImage.alt = event.target.alt

    // Modal paragraph text
    modalParagraph.textContent = event.target.alt
    // Modal open
    openPopup(pictureModal)
  }

  generateCard() {
    // code to generate and return the card element populated with data
    this._cardElement = this._getTemplate()
    this._cardElementImage = this._cardElement.querySelector(
      '.card__column-image'
    )
    this._cardElementTitle = this._cardElement.querySelector(
      '.card__column-image-title'
    )

    // Set listeners
    this._setEventListeners()

    // Add Content
    this._cardElementImage.alt = this._cardName
    this._cardElementImage.src = this._cardLink
    this._cardElementTitle.textContent = this._cardName

    return this._cardElement
  }
}
export default Card
