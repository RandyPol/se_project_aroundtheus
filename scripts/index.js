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

const profileEdit = document.querySelector('.profile__name-edit')
const closeModal = document.querySelector('.form__close')
const modalBlock = document.querySelector('.modal')

// Close Popup Function
function closePopup() {
  modalBlock.classList.remove('modal_opened')
}

// Form
const formElement = document.querySelector('.form')

// find the form fields in the DOM
const nameInput = document.querySelector('.form__input[id="name"]')
const roleInput = document.querySelector('.form__input[id="aboutMe"]')

// Profile textcontent on html
const profileName = document.querySelector('.profile__name')
const profileRole = document.querySelector('.profile__role')

profileEdit.addEventListener('click', (event) => {
  modalBlock.classList.add('modal_opened')
  nameInput.value = profileName.textContent
  roleInput.value = profileRole.textContent
})

closeModal.addEventListener('click', () => {
  closePopup()
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault()

  // get the values of each field from the value property
  // of the corresponding input element

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = nameInput.value
  profileRole.textContent = roleInput.value

  // Close the modal after save
  closePopup()
}

formElement.addEventListener('submit', handleProfileFormSubmit)

// Cards container
const cardsContainer = document.querySelector('.cards')

// Card Template
const cardTemplate = document.querySelector('#card').content

function getCardElement(data) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true)

  // Add Content
  const cardElementImage = cardElement.querySelector('.card__column-image')
  cardElementImage.src = data.link
  cardElementImage.alt = data.name
  cardElement.querySelector('.card__column-image-title').textContent = data.name

  return cardElement
}

initialCards.forEach((cardData) => {
  let createCard = getCardElement(cardData)
  cardsContainer.append(createCard)
})
