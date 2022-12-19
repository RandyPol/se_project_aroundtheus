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
    profileName.textContent = nameInput.value
    profileRole.textContent = roleInput.value
    closePopup(event.target.closest('.modal'))
    return
  }
  // Adding New Card
  let name = document.querySelector('#title')
  let link = document.querySelector('#imageLink')
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

// Add cards function
function addCardElement(data) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  // Add Content
  const cardElementImage = cardElement.querySelector('.card__column-image')
  cardElementImage.src = data.link
  cardElementImage.alt = data.name
  cardElement.querySelector('.card__column-image-title').textContent = data.name
  cardsContainer.prepend(cardElement)
}

initialCards.forEach((cardData) => {
  addCardElement(cardData)
})
