import FormValidator from '../scripts/FormValidator.js'
import Card from '../scripts/Card.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import UserInfo from '../scripts/UserInfo.js'
import Section from '../scripts/Section.js'
import {
  initialCards,
  validationSettings,
  cardTemplate,
  pictureModal,
  modalImage,
  modalParagraph,
  modalEditForm,
  modalAddForm,
  profileOpenButton,
  modalAddOpenButton,
} from '../scripts/constants.js'

import { fillProfileForm } from '../scripts/utils.js'

// Adding the initials cards
const prependCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, handleImageClick)
      prependCard.addItem(card.generateCard())
    },
  },
  '.cards'
)

/**------------------------------------------------------------------- 
 * Form Validator Classes
 ------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, modalEditForm)
editFormValidator.enableValidation()
const addFormValidator = new FormValidator(validationSettings, modalAddForm)
addFormValidator.enableValidation()

/**------------------------------------------------------------------- 
 * Initiating PopupWithImage Class For Picture Modal
 ------------------------------------------------------------------- */
const imagePopupModal = new PopupWithImage(
  pictureModal,
  modalImage,
  modalParagraph
)

imagePopupModal.setEventListeners()

// Image modal function to pass to the card class as an argument
const handleImageClick = (evt) => {
  imagePopupModal.open(evt.target.src, evt.target.alt)
}

/**------------------------------------------------------------------- 
 * Initiating PopupWithForm Class For Edit Profile Modal
 ------------------------------------------------------------------- */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__role',
})

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data)
}

const profileEditFormPopup = new PopupWithForm(
  handleProfileFormSubmit,
  '#modalEdit'
)
profileEditFormPopup.setEventListeners()

/**------------------------------------------------------------------- 
 * Initiating PopupWithForm Class For Adding Card Modal
 ------------------------------------------------------------------- */
// Handling submit function for modal card add
const handleCardFormSubmit = (data) => {
  const card = new Card(
    { name: data.title, link: data.imageLink },
    cardTemplate,
    handleImageClick
  )
  prependCard.addItem(card.generateCard())
}

const cardAddFormPopup = new PopupWithForm(handleCardFormSubmit, '#modalAdd')
cardAddFormPopup.setEventListeners()

/**------------------------------------------------------------------- 
 * Event Handlers
 ------------------------------------------------------------------- */
const handleEditProfileModal = () => {
  editFormValidator.resetValidation()
  fillProfileForm(userInfo.getUserInfo())
  profileEditFormPopup.open()
}

const handleAddCardModal = () => {
  addFormValidator.resetValidation()
  cardAddFormPopup.open()
}

/**------------------------------------------------------------------- 
 * addEventListeners
 ------------------------------------------------------------------- */

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', handleEditProfileModal)

// The card add modal | Button listerner
modalAddOpenButton.addEventListener('click', handleAddCardModal)

/** ------------------------------------------------------------------- */

// Calling the prependCard render method to prepend the cards
prependCard.renderItems()
