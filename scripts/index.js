import FormValidator from './FormValidator.js'
import Card from './Card.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import Section from './Section.js'
import {
  initialCards,
  validationSettings,
  cardTemplate,
  nameInput,
  roleInput,
} from './constants.js'

import { fillProfileForm } from './utils.js'

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

// The profile edit modal | Button
const modalEdit = document.querySelector('#modalEdit')
const modalEditForm = modalEdit.querySelector('.form')
const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
const modalAdd = document.querySelector('#modalAdd')
const modalAddForm = modalAdd.querySelector('.form')
const modalAddOpenButton = document.querySelector('.profile__add-button')

/**------------------------------------------------------------------- 
 * Form Validator Classes
 ------------------------------------------------------------------- */

const editFormValidator = new FormValidator(validationSettings, modalEditForm)
editFormValidator.enableValidation()
const addFormValidator = new FormValidator(validationSettings, modalAddForm)
addFormValidator.enableValidation()

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
  // addCardElement(createCard({ name: name.value, link: link.value }, '#card'))
  console.log(data)
}

const cardAddFormPopup = new PopupWithForm(handleCardFormSubmit, '#modalAdd')
cardAddFormPopup.setEventListeners()

// Image modal function to pass to the card class as an argument
function handleImageClick() {
  // code for handling image click event
  // Insert background image
  modalImage.src = this.src
  modalImage.alt = this.alt
  // Modal paragraph text
  modalParagraph.textContent = this.alt
  // Modal open
  openPopup(pictureModal)
}

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
