import { nameInput, roleInput } from './constants.js'

// Overlay close feature/function
export function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

// Overlay close by pressing ESC
export function closeModalEscapeKeydown(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened')
    closePopup(openedModal)
  }
}

// General Close Modal Function
export function closePopup(blockModal) {
  // Add Escape keydown
  document.removeEventListener('keydown', closeModalEscapeKeydown)
  // remove the mousedown listener from the modal when closing it
  blockModal.removeEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.remove('modal_opened')
}

// General Open Modal Function
export function openPopup(blockModal) {
  // Add Escape keydown
  document.addEventListener('keydown', closeModalEscapeKeydown)
  // add the mousedown listener to the modal when opening it
  blockModal.addEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.add('modal_opened')
}

// Function to prefill the frm data
export const fillProfileForm = ({ name, aboutMe }) => {
  nameInput.value = name
  roleInput.value = aboutMe
}
