import Popup from './Popup'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector)
    this._image = this._popupElement.querySelector(imageSelector)
    this._caption = this._popupElement.querySelector(captionSelector)
  }

  open(image, caption) {
    super.open()
    this._image.src = image
    this._image.alt = caption
    this._caption.textContent = caption
  }
}
