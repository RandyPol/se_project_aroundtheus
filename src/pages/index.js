import './index.css'

import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'

import {
  validationSettings,
  cardTemplate,
  pictureModal,
  modalImage,
  modalParagraph,
  profileOpenButton,
  modalAddOpenButton,
  BASE_URL,
  AUTH_TOKEN,
} from '../utils/constants.js'

// Adding the initials cards

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
  },
})

function createCard(item) {
  // here you create a card
  const card = new Card(item, cardTemplate, handleImageClick)
  return card.generateCard()
}

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: createCard,
//   },
//   '.cards'
// )

/**------------------------------------------------------------------- 
 * Form Validator Classes
 ------------------------------------------------------------------- */
const formValidators = {}

// enable validation
const enableValidation = (config) => {
  //  Make a list of all forms
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  //  For Each Form
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // here you get the name of the form
    const formName = formElement.getAttribute('name')

    // here you store a validator by the `name` of the form
    formValidators[formName] = validator
    validator.enableValidation()
  })
}

enableValidation(validationSettings)

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
  formValidators['profileForm'].resetValidation()
  profileEditFormPopup.setInputValues(userInfo.getUserInfo())
  profileEditFormPopup.open()
}

const handleAddCardModal = () => {
  formValidators['cardForm'].resetValidation()
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
// cardSection.renderItems()
api
  .loadData()
  .then((data) => {
    const [userData, cardData] = data
    console.log(userData)
    console.log(cardData)
    // cardSection.renderItems(data[1])
    userInfo.setUserInfo(userData)
  })
  .catch((err) => {
    console.log(err)
  })
