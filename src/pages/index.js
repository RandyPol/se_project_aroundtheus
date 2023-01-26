import './index.css'

import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupDeleteCard from '../components/PopupDeleteCard.js'
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
  avatarButtonEdit,
  avatarImageSrc,
} from '../utils/constants.js'

// Adding the initials cards

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
  },
})

function createCard(item, currentUserId) {
  // here you create a card
  const card = new Card(
    item,
    cardTemplate,
    handleImageClick,
    handleTrashClick,
    currentUserId,
    handleHeartClick
  )
  return card.generateCard()
}

const cardSection = new Section(
  {
    renderer: createCard,
  },
  '.cards'
)

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
 * Handle Heart Click
 ------------------------------------------------------------------- */

const handleHeartClick = (card) => {
  if (card.getCardLikeStatus()) {
    api
      .deleteCardLike(card.getId())
      .then((res) => {
        card.toggleLikeButton(res.likes.length)
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    api
      .putCardLike(card.getId())
      .then((res) => {
        card.toggleLikeButton(res.likes.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

/**------------------------------------------------------------------- 
/

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
/**------------------------------------------------------------------- 
 * Initiating PopupDleteCard Class For Delete Card Modal
 ------------------------------------------------------------------- */

const handleTrashClick = (card) => {
  popupDeleteCard.open(card)
}

const popupDeleteCard = new PopupDeleteCard('#modalDelete', (card) => {
  api
    .deleteCard(card.getId())
    .then(() => {
      // code to remove the card element from the DOM
      card.deleteCard()
      popupDeleteCard.close()
    })
    .catch((err) => {
      console.log(err)
    })
})
popupDeleteCard.setEventListeners()
/**------------------------------------------------------------------- 
 * Initiating PopupWithForm Class For Edit Profile Modal
 ------------------------------------------------------------------- */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__role',
  avatarSelector: '.profile__avatar',
})

const handleProfileFormSubmit = (data) => {
  api
    .patchUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res)
      profileEditFormPopup.close()
      profileEditFormPopup.renderLoading()
    })
    .catch((err) => {
      console.log(err)
    })
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
  api
    .postNewCard(data)
    .then((res) => {
      cardAddFormPopup.close()
      cardAddFormPopup.renderLoading()
      cardSection.addItem(res, res.owner._id)
    })
    .catch((err) => {
      console.log(err)
    })
}

const cardAddFormPopup = new PopupWithForm(handleCardFormSubmit, '#modalAdd')
cardAddFormPopup.setEventListeners()

/**-------------------------------------------------------------------
 * Initiating PopupWithForm Class For Avatar Edit Modal ------------------------------------------------------------------- */
// Handling submit function for modal card add

const handleAvatarFormSubmit = ({ link: avatar }) => {
  api
    .patchUserAvatar({ avatar })
    .then((res) => {
      avatarModalPopup.close()
      avatarModalPopup.renderLoading()
      avatarImageSrc.src = res.avatar
    })
    .catch((err) => {
      console.log(err)
    })
}

const avatarModalPopup = new PopupWithForm(
  handleAvatarFormSubmit,
  '#modalEditAvatar'
)
avatarModalPopup.setEventListeners()

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
const handleAvatarClick = () => {
  formValidators['avatarForm'].resetValidation()
  avatarModalPopup.open()
}

/**------------------------------------------------------------------- 
 * addEventListeners
 ------------------------------------------------------------------- */

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', handleEditProfileModal)

// The card add modal | Button listerner
modalAddOpenButton.addEventListener('click', handleAddCardModal)

// The card add modal | Button listerner
avatarButtonEdit.addEventListener('click', handleAvatarClick)

/** ------------------------------------------------------------------- */

// Calling the cardSection render method to prepend the cards
api
  .loadData()
  .then((data) => {
    const [userData, cardData] = data
    cardSection.renderInitialCards(cardData, userData._id)
    userInfo.setUserInfo(userData)
  })
  .catch((err) => {
    console.log(err)
  })
