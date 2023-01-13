export const initialCards = [
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

//
// Using Clasess for validation
//
export const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

// Card Template Selector
export const cardTemplate = '#card'

// find the form inout_fields in the DOM
export const nameInput = document.querySelector('#name')
export const roleInput = document.querySelector('#aboutMe')

// Cards container
export const cardsContainer = document.querySelector('.cards')

// Picture expanded modal | Modal Card Image | Paragraph text
export const pictureModal = '#modalPicture'
export const modalImage = '.modal__picture-full'
export const modalParagraph = '.modal__piture-paragraph'

// The profile edit modal | Button
export const modalEdit = document.querySelector('#modalEdit')
export const modalEditForm = modalEdit.querySelector('.form')
export const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
export const modalAdd = document.querySelector('#modalAdd')
export const modalAddForm = modalAdd.querySelector('.form')
export const modalAddOpenButton = document.querySelector('.profile__add-button')
