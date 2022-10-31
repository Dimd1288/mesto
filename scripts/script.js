import {Card} from "../scripts/Card.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements__list');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('#edit-profile');
const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
const profileEditPopupNameInput = profileEditPopupContainer.querySelector('#name-input');
const profileEditPopupAboutInput = profileEditPopupContainer.querySelector('#about-input');
const profileEditSubmitButton = profileEditPopup.querySelector('.popup__save-button');
const placeAddButton = document.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#add-place');
const placeAddPopupContainer = placeAddPopup.querySelector('.popup__container');
const placeAddPopupForm = placeAddPopupContainer.querySelector('.popup__form');
const placeAddPopupTitleInput = placeAddPopupContainer.querySelector('#title-input');
const placeAddPopupLinkInput = placeAddPopupContainer.querySelector('#link-input');
const placeZoomPopup = document.querySelector('#element-popup');
const popupImage = placeZoomPopup.querySelector('.popup__image');
const popupCaption = placeZoomPopup.querySelector('.popup__caption');
const popupsList = Array.from(document.querySelectorAll('.popup'));
const placeAddsubmitButton = placeAddPopup.querySelector('.popup__save-button');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function enableClosePopupListeners() {
  popupsList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupElement);
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popupElement);
      }
    })
  })
}

function openEditProfilePopup() {
  clearErrors(profileEditPopup, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openPopup(profileEditPopup);
  profileEditPopupNameInput.value = profileName.textContent;
  profileEditPopupAboutInput.value = profileAbout.textContent;
}

function openAddPlacePopup() {
  clearErrors(placeAddPopup, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  placeAddPopupForm.reset()
  openPopup(placeAddPopup);
}

function handleSubmitForm(event) {
  event.preventDefault();
  profileName.textContent = profileEditPopupNameInput.value;
  profileAbout.textContent = profileEditPopupAboutInput.value;
  closePopup(profileEditPopup);
  disableSubmitButton(profileEditSubmitButton, 'popup__save-button_disabled');
}

initialCards.forEach((cardElement) => {
  const card = new Card(cardElement, "#element");
  cardsContainer.prepend(card.generateCard());
})

function handleSubmitAddPlaceForm(event) {
  event.preventDefault();
  const cardObject = {};
  cardObject.name = placeAddPopupTitleInput.value;
  cardObject.link = placeAddPopupLinkInput.value;
  const card = new Card(cardObject, "#element");
  cardsContainer.prepend(card.generateCard());
  closePopup(placeAddPopup);
  disableSubmitButton(placeAddsubmitButton, 'popup__save-button_disabled');
}

enableClosePopupListeners();

profileEditButton.addEventListener('click', openEditProfilePopup);

placeAddButton.addEventListener('click', openAddPlacePopup);

profileEditPopupForm.addEventListener('submit', handleSubmitForm);

placeAddPopupForm.addEventListener('submit', handleSubmitAddPlaceForm);


export {placeZoomPopup, popupImage, popupCaption, openPopup}