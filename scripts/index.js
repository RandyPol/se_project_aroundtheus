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

// find the form fields in the DOM
const nameInput = document.querySelector('.form__input[id="name"]')
const roleInput = document.querySelector('.form__input[id="aboutMe"]')

// Add click event listner for all open button
const allModalOpenButton = document.querySelectorAll('.profile__button')
allModalOpenButton.forEach((openButton) =>
  openButton.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('profile__name-edit')) {
      const modalEdit = document.querySelector('#modalEdit')
      nameInput.value = document.querySelector('.profile__name').textContent
      roleInput.value = document.querySelector('.profile__role').textContent
      modalEdit.classList.add('modal_opened')
      return
    }
    const modalAdd = document.querySelector('#modalAdd')
    modalAdd.classList.add('modal_opened')
    console.log("Ass")
  })
)

// ===> Edit Modal
// Profile Edit button
// const profileEditButton = document.querySelector('.profile__name-edit')
// const modalEdit = document.querySelector('#modalEdit')

// // Open Edit Form
// profileEditButton.addEventListener('click', (event) => {
//   modalEdit.classList.add('modal_opened')
//   nameInput.value = profileName.textContent
//   roleInput.value = profileRole.textContent
// })

// ===> Add Modal
// Add Button

// Open Add Form
// profileAddButton.addEventListener('click', (event) => {
//   modalAdd.classList.add('modal_opened')
// })

// Add click event listner for all close button
const closeAllModal = document.querySelectorAll('.form__button-close')
closeAllModal.forEach((closeButton) =>
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.modal'))
  })
)

// const modalAdd = document.querySelector('#modalAdd')

// find the form fields in the DOM
const titleInput = document.querySelector('.form__input[id="title"]')
const imageInput = document.querySelector('.form__input[id="imageLink"]')

// General Close Modal Function
function closePopup(blockModal) {
  blockModal.classList.remove('modal_opened')
}

function handleProfileFormSubmit(event) {
  event.preventDefault()
  console.log(event.target)
  // get the values of each field from the value property
  // of the corresponding input element

  // insert new values into the textContent property of the
  // corresponding profile elements
  // profileName.textContent = nameInput.value
  // profileRole.textContent = roleInput.value

  // Close the modal after save
  // closePopup()
}
// Getting all form and adding the submit event listerner
const formElement = document.querySelectorAll('.form')
formElement.forEach((form) =>
  form.addEventListener('submit', handleProfileFormSubmit)
)

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

// Add new card
const addCardButton = document.querySelector('.profile__add-button')
