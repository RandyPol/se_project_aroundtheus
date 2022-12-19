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

// Cards container
const cardsContainer = document.querySelector('.cards')
// Card Template
const cardTemplate = document.querySelector('#card').content

// find the form fields in the DOM
const nameInput = document.querySelector('#name')
const roleInput = document.querySelector('#aboutMe')
const profileName = document.querySelector('.profile__name')
const profileRole = document.querySelector('.profile__role')

// General Close Modal Function
function closePopup(blockModal) {
  blockModal.classList.remove('modal_opened')
}

// Add click event listner for all modal open button
const allModalOpenButton = document.querySelectorAll('.profile__button')
allModalOpenButton.forEach((openButton) =>
  openButton.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('profile__name-edit')) {
      const modalEdit = document.querySelector('#modalEdit')
      nameInput.value = profileName.textContent
      roleInput.value = profileRole.textContent
      modalEdit.classList.add('modal_opened')
      return
    }
    const modalAdd = document.querySelector('#modalAdd')
    modalAdd.classList.add('modal_opened')
  })
)

// Add click event listner for all close button
const closeAllModal = document.querySelectorAll('.form__button-close')
closeAllModal.forEach((closeButton) =>
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.modal'))
  })
)

function handleProfileFormSubmit(event) {
  event.preventDefault()

  if (event.target.parentElement.id === 'modalEdit') {
    profileName.textContent = event.target.name.value
    profileRole.textContent = event.target.aboutMe.value
    closePopup(event.target.closest('.modal'))
    return
  }
  // Adding New Card
  let name = event.target.title
  let link = event.target.imageLink
  addCardElement({ name: name.value, link: link.value })
  name.value = ''
  link.value = ''

  closePopup(event.target.closest('.modal'))
}

// Getting all form and adding the submit event listerner
const formElement = document.querySelectorAll('.form')
formElement.forEach((form) =>
  form.addEventListener('submit', handleProfileFormSubmit)
)

// AddCardElement Event Handling Function
const cardIconToggle = (event) => {
  event.target.classList.toggle('card__heart-button_isActive')
}
// Erase card handling function
const eraseCard = (event) => {
  event.target.closest('.card').remove()
}

// Expand image modal handling function
const exapandImageModal = (event) => {
  // Insert background image
  const modalImage = document.querySelector('.modal__picture-full')
  modalImage.src = event.target.src
  modalImage.alt = event.target.alt

  const modalParagraph = document.querySelector('.modal__piture-paragraph')
  modalParagraph.textContent = event.target.alt

  const pictureModal = document.querySelector('#modalPicture')
  pictureModal.classList.toggle('modal_opened')
}

// Add cards function
function addCardElement(data) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  // Add Content
  const cardElementImage = cardElement.querySelector('.card__column-image')
  cardElementImage.src = data.link
  cardElementImage.alt = data.name
  cardElement.querySelector('.card__column-image-title').textContent = data.name
  // Like feature toggle
  const heartButton = cardElement.querySelector('.card__heart-button')
  heartButton.addEventListener('click', cardIconToggle)
  // Erase card feature
  const trashButton = cardElement.querySelector('.card__trash-button')
  trashButton.addEventListener('click', eraseCard)
  // Picture full modal
  cardElementImage.addEventListener('click', exapandImageModal)

  cardsContainer.prepend(cardElement)
}

initialCards.forEach((cardData) => {
  addCardElement(cardData)
})
