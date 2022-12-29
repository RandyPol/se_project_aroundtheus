import { resetValidation } from './validate.js'

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
  },
]

// Overlay close feature/function
function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

// Overlay close by pressing ESC
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'escape') {
    const theOpenModal = document.querySelector('.modal_opened')
    closePopup(theOpenModal)
  }
})

// The profile edit modal | Button
const modalEdit = document.querySelector('#modalEdit')
const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
const modalAdd = document.querySelector('#modalAdd')
const modalAddOpenButton = document.querySelector('.profile__add-button')

// Picture expanded modal | Modal Card Image | Paragraph text
const pictureModal = document.querySelector('#modalPicture')
const modalImage = document.querySelector('.modal__picture-full')
const modalParagraph = document.querySelector('.modal__piture-paragraph')

// Cards container
const cardsContainer = document.querySelector('.cards')
// Card Template
const cardTemplate = document.querySelector('#card').content

// find the form inout_fields in the DOM
const nameInput = document.querySelector('#name')
const roleInput = document.querySelector('#aboutMe')
const profileName = document.querySelector('.profile__name')
const profileRole = document.querySelector('.profile__role')

// General Open Modal Function
function openPopup(blockModal) {
  // add the mousedown listener to the modal when opening it
  blockModal.addEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.toggle('modal_opened')
}
// General Close Modal Function
function closePopup(blockModal) {
  // remove the mousedown listener from the modal when closing it
  blockModal.removeEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.toggle('modal_opened')
}

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', () => {
  resetValidation(modalEdit.querySelector(".form"))
  nameInput.value = profileName.textContent
  roleInput.value = profileRole.textContent
  openPopup(modalEdit)
})
// The card add modal | Button listerner 
modalAddOpenButton.addEventListener('click', () => {
  resetValidation(modalAdd.querySelector(".form"))
  openPopup(modalAdd)
})

// Add click event listner for all close button
const closeAllModal = document.querySelectorAll('.modal__button-close')
closeAllModal.forEach((closeButton) =>
  closeButton.addEventListener('click', (event) => {
    // Calling the resetValidation function from validate.js
    if (event.target.closest('.form')) {
      resetValidation(event.target.closest('.form'))
    }
    closePopup(event.target.closest('.modal'))
  })
)

// Handling submit function for modal profile edit
const handleProfileFormSubmit = (event) => {
  event.preventDefault()

  profileName.textContent = event.target.name.value
  profileRole.textContent = event.target.aboutMe.value

  closePopup(event.target.closest('.modal'))
}

// Handling submit function for modal profile edit
const handleCardFormSubmit = (event) => {
  event.preventDefault()

  const name = event.target.title
  const link = event.target.imageLink
  addCardElement(createCard({ name: name.value, link: link.value }))
  event.target.reset()

  closePopup(event.target.closest('.modal'))
}

// Add event listener to edit submit form
modalEdit
  .querySelector('.form')
  .addEventListener('submit', handleProfileFormSubmit)
// Add event listener to add card form
modalAdd.querySelector('.form').addEventListener('submit', handleCardFormSubmit)

// AddCardElement Event Handling Function
const toggleLike = (event) => {
  event.target.classList.toggle('card__heart-button_isActive')
}
// Erase card handling function
const eraseCard = (event) => {
  event.target.closest('.card').remove()
}

// Expand image modal handling function
const exapandImageModal = (event) => {
  // Insert background image
  modalImage.src = event.target.src
  modalImage.alt = event.target.alt

  // Modal paragraph text
  modalParagraph.textContent = event.target.alt
  // Modal open
  openPopup(pictureModal)
}

// Add cards function
function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  // Add Content
  const cardElementImage = cardElement.querySelector('.card__column-image')
  cardElementImage.src = data.link
  cardElementImage.alt = data.name
  cardElement.querySelector('.card__column-image-title').textContent = data.name
  // Like feature toggle
  const heartButton = cardElement.querySelector('.card__heart-button')
  heartButton.addEventListener('click', toggleLike)
  // Erase card feature
  const trashButton = cardElement.querySelector('.card__trash-button')
  trashButton.addEventListener('click', eraseCard)
  // Picture full modal
  cardElementImage.addEventListener('click', exapandImageModal)

  return cardElement
}

// Prepare create card into the cards containers
function addCardElement(cardCreate) {
  cardsContainer.prepend(cardCreate)
}

initialCards.forEach((cardData) => addCardElement(createCard(cardData)))
