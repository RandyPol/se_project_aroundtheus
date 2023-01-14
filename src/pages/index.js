import './index.css'

import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
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
} from '../utils/constants.js'

// Adding the initials cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, handleImageClick)
      return card.generateCard()
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
  cardSection.addItem({ name: data.title, link: data.imageLink })
  console.log(data)
}

const cardAddFormPopup = new PopupWithForm(handleCardFormSubmit, '#modalAdd')
cardAddFormPopup.setEventListeners()

/**------------------------------------------------------------------- 
 * Event Handlers
 ------------------------------------------------------------------- */
const handleEditProfileModal = () => {
  editFormValidator.resetValidation()
  profileEditFormPopup.setInputValues(userInfo.getUserInfo())
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

// Calling the cardSection render method to prepend the cards
cardSection.renderItems()
