import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Popup from './Popup.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import { initialCards, validationSettings, cardTemplate } from './constants.js'

// The profile edit modal | Button
const modalEdit = document.querySelector('#modalEdit')
const modalEditForm = modalEdit.querySelector('.form')
const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
const modalAdd = document.querySelector('#modalAdd')
const modalAddForm = modalAdd.querySelector('.form')
const modalAddOpenButton = document.querySelector('.profile__add-button')

const editFormValidator = new FormValidator(validationSettings, modalEditForm)
editFormValidator.enableValidation()
const addFormValidator = new FormValidator(validationSettings, modalAddForm)
addFormValidator.enableValidation()


/**
 * PopupWithForm: Profile Edit
 */
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

/**
 * PopupWithForm: Adding Card
 */

const cardAddPopup = new PopupWithForm(handleProfileFormSubmit, '#modalEdit')

cardAddPopup.setEventListeners()

//
// //
//

// Picture expanded modal | Modal Card Image | Paragraph text
export const pictureModal = document.querySelector('#modalPicture')
export const modalImage = document.querySelector('.modal__picture-full')
export const modalParagraph = document.querySelector('.modal__piture-paragraph')

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

// Cards container
export const cardsContainer = document.querySelector('.cards')

/**
 * Profile Edit Button | Profile Edit Modal
 */

// find the form inout_fields in the DOM
const nameInput = document.querySelector('#name')
const roleInput = document.querySelector('#aboutMe')

// Function to prefill the frm data
const fillProfileForm = ({ name, aboutMe }) => {
  nameInput.value = name
  roleInput.value = aboutMe
}

const handleEditProfileModal = () => {
  editFormValidator.resetValidation()
  fillProfileForm(userInfo.getUserInfo())
  profileEditFormPopup.open()
}

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', handleEditProfileModal)



/**
 * Card Add Button | Profile Edit Modal
 */


// The card add modal | Button listerner
modalAddOpenButton.addEventListener('click', () => {
  addFormValidator.resetValidation()
  openPopup(modalAdd)
})

// Handling submit function for modal card add
// export const handleCardFormSubmit = (event) => {
//   event.preventDefault()

//   const name = event.target.title
//   const link = event.target.imageLink
//   addCardElement(createCard({ name: name.value, link: link.value }, '#card'))
//   closePopup(modalAdd)
// }

// Add event listener to edit submit form
// modalEditForm.addEventListener('submit', handleProfileFormSubmit)
// // Add event listener to add card form
// modalAddForm.addEventListener('submit', handleCardFormSubmit)

// Create a createCard method
export function createCard(data, cardTemplate, handleImage = handleImageClick) {
  const card = new Card(data, cardTemplate, handleImage)
  return card.generateCard()
}

// Prepare create card into the cards containers
function addCardElement(createdCard) {
  cardsContainer.prepend(createdCard)
}

initialCards.forEach((cardData) => {
  addCardElement(createCard(cardData, cardTemplate, handleImageClick))
})
