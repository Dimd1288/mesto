import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector('.elements__list');
const cardListSelector = '.elements__list';
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('#edit-profile');
const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
const profileEditPopupNameInput = profileEditPopupContainer.querySelector('#name-input');
const profileEditPopupAboutInput = profileEditPopupContainer.querySelector('#about-input');
const placeAddButton = document.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#add-place');
const placeAddPopupContainer = placeAddPopup.querySelector('.popup__container');
const placeAddPopupForm = placeAddPopupContainer.querySelector('.popup__form');
const placeZoomPopup = document.querySelector('#element-popup');
const popupImage = placeZoomPopup.querySelector('.popup__image');
const popupCaption = placeZoomPopup.querySelector('.popup__caption');

const profileEditFormValidator = new FormValidator(validationParameters, profileEditPopupForm);

const placeAddFormValidator = new FormValidator(validationParameters, placeAddPopupForm);

const popupWithImage = new PopupWithImage('#element-popup');

const popupWithPlaceForm = new PopupWithForm('#add-place', handleSubmitAddPlaceForm);

const popupWithUserInfoForm = new PopupWithForm('#edit-profile', handleSubmitUserInfoForm);

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, "#element", handleOpenCard);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}}, cardListSelector);

function openAddPlacePopup() {
  placeAddFormValidator.clearErrors();
  popupWithPlaceForm.open();
}

function openUserInfoPopup() {
  profileEditFormValidator.clearErrors();
  popupWithUserInfoForm.open();
  profileEditPopupNameInput.value = profileName.textContent;
  profileEditPopupAboutInput.value = profileAbout.textContent;
}

function handleOpenCard(image, title) {
 popupWithImage.open(image, title);
}

function handleSubmitAddPlaceForm(formInputValues){
  const card = new Card(formInputValues, "#element", handleOpenCard);
  cardsContainer.prepend(card.generateCard());
}

function handleSubmitUserInfoForm(formInputValues) {
  profileName.textContent = formInputValues.name;
  profileAbout.textContent = formInputValues.about;
}

popupWithImage.setEventListeners();

popupWithPlaceForm.setEventListeners();

popupWithUserInfoForm.setEventListeners();

cardList.renderItems();

profileEditFormValidator.enableValidation();

placeAddFormValidator.enableValidation();

profileEditButton.addEventListener('click', openUserInfoPopup);

placeAddButton.addEventListener('click', openAddPlacePopup);

export { placeZoomPopup, popupImage, popupCaption}