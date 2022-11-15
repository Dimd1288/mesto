import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

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

const profileEditButton = document.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('#edit-profile');

const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');

const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');

const placeAddButton = document.querySelector('.profile__add-button');

const placeAddPopup = document.querySelector('#add-place');

const placeAddPopupContainer = placeAddPopup.querySelector('.popup__container');

const placeAddPopupForm = placeAddPopupContainer.querySelector('.popup__form');

const profileEditFormValidator = new FormValidator(validationParameters, profileEditPopupForm);

const placeAddFormValidator = new FormValidator(validationParameters, placeAddPopupForm);

const popupWithImage = new PopupWithImage('#element-popup');

const popupWithPlaceForm = new PopupWithForm('#add-place', (formInputValues) => {
  cardList.addItem(createCard(formInputValues));
  placeAddFormValidator.disableSubmitButton();
});

const popupWithUserInfoForm = new PopupWithForm('#edit-profile', (formInputValues) => {
  userInfo.setUserInfo(formInputValues);
  profileEditFormValidator.disableSubmitButton();
});

const cardList = new Section({
  items: initialCards, renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements__list');

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__about' });

function createCard(cardData) {
  const card = new Card(cardData, "#element", (image, title) => { popupWithImage.open(image, title); });
  return card.generateCard();
}

popupWithImage.setEventListeners();

popupWithPlaceForm.setEventListeners();

popupWithUserInfoForm.setEventListeners();

cardList.renderItems();

profileEditFormValidator.enableValidation();

placeAddFormValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  profileEditFormValidator.clearErrors();
  popupWithUserInfoForm.open();
  popupWithUserInfoForm.setDefaultInputValues(userInfo.getUserInfo());
});

placeAddButton.addEventListener('click', () => {
  placeAddFormValidator.clearErrors();
  popupWithPlaceForm.open();
});