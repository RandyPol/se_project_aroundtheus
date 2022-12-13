let initialCards = [
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

let profileEdit = document.querySelector('.profile__name-edit')
let closeModal = document.querySelector('.form__close')
let modalBlock = document.querySelector('.modal')

profileEdit.addEventListener('click', (event) => {
  modalBlock.classList.add('modal_opened')
})

closeModal.addEventListener('click', () => {
  modalBlock.classList.remove('modal_opened')
})

let nameInput = document.querySelector('.form__input[id="name"]')
let roleInput = document.querySelector('.form__input[id="aboutMe"]')
let profileName = document.querySelector('.profile__name')
let profileRole = document.querySelector('.profile__role')
nameInput.value = profileName.textContent
roleInput.value = profileRole.textContent
