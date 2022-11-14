import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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

const popupWithPlaceForm = new PopupWithForm('#add-place', handleSubmitAddPlaceForm);

const popupWithUserInfoForm = new PopupWithForm('#edit-profile', handleSubmitUserInfoForm);

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, "#element", handleOpenCard);
  cardList.addItem(card.generateCard());
}}, '.elements__list');

const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__about'});

function openAddPlacePopup() {
  placeAddFormValidator.clearErrors();
  popupWithPlaceForm.open();
}

function openUserInfoPopup() {
  profileEditFormValidator.clearErrors();
  popupWithUserInfoForm.open();
  popupWithUserInfoForm.setDefaultInputValues(userInfo.getUserInfo());
}

function handleOpenCard(image, title) {
 popupWithImage.open(image, title);
}

function handleSubmitAddPlaceForm(formInputValues){
  const card = new Card(formInputValues, "#element", handleOpenCard);
  cardList.addItem(card.generateCard());
}

function handleSubmitUserInfoForm(formInputValues) {
  userInfo.setUserInfo(formInputValues);
}

popupWithImage.setEventListeners();

popupWithPlaceForm.setEventListeners();

popupWithUserInfoForm.setEventListeners();

cardList.renderItems();

profileEditFormValidator.enableValidation();

placeAddFormValidator.enableValidation();

profileEditButton.addEventListener('click', openUserInfoPopup);

placeAddButton.addEventListener('click', openAddPlacePopup);