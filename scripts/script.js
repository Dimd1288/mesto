const root = document.querySelector('.root');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('#editProfile');
const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
const profileEditPopupCloseIcon = profileEditPopupContainer.querySelector('.popup__close-icon');
const profileEditPopupNameInput = profileEditPopupContainer.querySelector('.popup__input_type_name');
const profileEditPopupAboutInput = profileEditPopupContainer.querySelector('.popup__input_type_about');
const cardsContainer = document.querySelector('.elements__list');
const cardItem = cardsContainer.querySelector('.element');
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#addPlace');
const addPlacePopupContainer = addPlacePopup.querySelector('.popup__container');
const addPlacePopupForm = addPlacePopupContainer.querySelector('.popup__form');
const addPlacePopupCloseIcon = addPlacePopupContainer.querySelector('.popup__close-icon');
const addPlacePopupTitleInput = addPlacePopupContainer.querySelector('.popup__input_type_title');
const addPlacePopupLinkInput = addPlacePopupContainer.querySelector('.popup__input_type_link');

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




function openEditProfilePopup() {
  profileEditPopup.classList.add('popup_opened');
  profileEditPopup.classList.remove('popup_closed');
  profileEditPopupNameInput.value = profileName.textContent;
  profileEditPopupAboutInput.value = profileAbout.textContent;
}

function closeEditProfilePopup() {
  profileEditPopup.classList.add('popup_closed');
  profileEditPopup.classList.remove('popup_opened');
}

function openAddPlacePopup() {
  addPlacePopup.classList.add('popup_opened');
  addPlacePopup.classList.remove('popup_closed');
}

function closeAddPlacePopup() {
  addPlacePopup.classList.add('popup_closed');
  addPlacePopup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = profileEditPopupNameInput.value;
  profileAbout.textContent = profileEditPopupAboutInput.value;
  closeEditProfilePopup();
}

function renderCard(card) {
  const elementTemplate = cardsContainer.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__title').textContent = card.name;
  element.querySelector('.element__popup-image').src = card.link;
  element.querySelector('.element__popup-caption').textContent = card.name;
  return element;
}

function addNewCard(card) {
  const element = renderCard(card);
  cardsContainer.prepend(element);
  loadLikeButton(element);
  loadBasketButton(element);
  loadPlacePopup(element);
  loadPlaceImage(element);
}

function loadLikeButton(element) {
  const cardLikeIcon = element.querySelector('.element__like');
  cardLikeIcon.addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });
}

function loadBasketButton(element) {
  const cardBasketIcon = element.querySelector('.element__basket');
  cardBasketIcon.addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  })
}

function loadPlaceImage(element) {
  const placeImage = element.querySelector('.element__image');
  placeImage.addEventListener('click', (event) => {
    event.target.closest('.element').querySelector('.popup')
      .classList.add('popup_opened');
    event.target.closest('.element').querySelector('.popup')
      .classList.remove('popup_closed');
  })
}

function loadPlacePopup(element) {
  const placePopup = element.querySelector('#elementPopup');
  const closePlacePopupIcon = element.querySelector('.popup__close-icon');
  closePlacePopupIcon.addEventListener('click', (event) => {
    event.target.closest('.popup').classList.remove('popup_opened');
    event.target.closest('.popup').classList.add('popup_closed');
  })
}

function fillPageWithInitialCards() {
  initialCards.forEach(addNewCard);
}

function addPlaceFormSubmitHandler(event) {
  event.preventDefault();
  let cardObject = {};
  cardObject.name = addPlacePopupTitleInput.value;
  cardObject.link = addPlacePopupLinkInput.value;
  addNewCard(cardObject);
  closeAddPlacePopup();
}

document.addEventListener('DOMContentLoaded', fillPageWithInitialCards);

profileEditButton.addEventListener('click', openEditProfilePopup);

profileEditPopupCloseIcon.addEventListener('click', closeEditProfilePopup);

addPlaceButton.addEventListener('click', openAddPlacePopup);

addPlacePopupCloseIcon.addEventListener('click', closeAddPlacePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler);

addPlacePopupForm.addEventListener('submit', addPlaceFormSubmitHandler);