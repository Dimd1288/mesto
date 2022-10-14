const cardsContainer = document.querySelector('.elements__list');
const cardItem = cardsContainer.querySelector('.element');
const root = document.querySelector('.root');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('#edit-profile');
const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
const profileEditPopupCloseIcon = profileEditPopupContainer.querySelector('.popup__close-icon');
const profileEditPopupNameInput = profileEditPopupContainer.querySelector('#name-input');
const profileEditPopupAboutInput = profileEditPopupContainer.querySelector('#about-input');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#add-place');
const addPlacePopupContainer = addPlacePopup.querySelector('.popup__container');
const addPlacePopupForm = addPlacePopupContainer.querySelector('.popup__form');
const addPlacePopupCloseIcon = addPlacePopupContainer.querySelector('.popup__close-icon');
const addPlacePopupTitleInput = addPlacePopupContainer.querySelector('#title-input');
const addPlacePopupLinkInput = addPlacePopupContainer.querySelector('#link-input');
const zoomPlacePopup = document.querySelector('#element-popup');
const popupImage = zoomPlacePopup.querySelector('.popup__image');
const popupCaption = zoomPlacePopup.querySelector('.popup__caption');
const closeZoomPlacePopupIcon = zoomPlacePopup.querySelector('.popup__close-icon');

fillPageWithInitialCards();

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  const formElement = popup.querySelector('.popup__form');
  const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputsList.forEach((inputElement) => {
    hideError(formElement, inputElement);
  });
}

function openEditProfilePopup() {
  openPopup(profileEditPopup);
  profileEditPopupNameInput.value = profileName.textContent;
  profileEditPopupAboutInput.value = profileAbout.textContent;
}

function closeEditProfilePopup() {
  closePopup(profileEditPopup);
}

function openAddPlacePopup() {
  addPlacePopupLinkInput.value = '';
  addPlacePopupTitleInput.value = '';
  openPopup(addPlacePopup);
}

function closeAddPlacePopup() {
  closePopup(addPlacePopup);
}

function closeZoomPlacePopup() {
  closePopup(zoomPlacePopup);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = profileEditPopupNameInput.value;
  profileAbout.textContent = profileEditPopupAboutInput.value;
  closeEditProfilePopup();
}

function createCard(card) {
  const elementTemplate = cardsContainer.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__title').textContent = card.name;
  return element;
}

function addNewCard(card) {
  const element = createCard(card);
  cardsContainer.prepend(element);
  loadLikeButtonClickListener(element);
  loadBasketButtonClickListener(element);
  loadPlacePopupOpenListener(element);
}

function loadLikeButtonClickListener(element) {
  const cardLikeIcon = element.querySelector('.element__like');
  cardLikeIcon.addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });
}

function loadBasketButtonClickListener(element) {
  const cardBasketIcon = element.querySelector('.element__basket');
  cardBasketIcon.addEventListener('click', () => {
    element.remove();
  })
}

function loadPlacePopupOpenListener(element) {
  const placeImage = element.querySelector('.element__image');
  const placeTitle = element.querySelector('.element__title');
  placeImage.addEventListener('click', () => {
    popupImage.src = placeImage.src;
    popupCaption.textContent = placeTitle.textContent;
    popupImage.alt = placeTitle.textContent;
    openPopup(zoomPlacePopup);
  })
}

function fillPageWithInitialCards() {
  initialCards.forEach(addNewCard);
}

function addPlaceFormSubmitHandler(event) {
  event.preventDefault();
  const cardObject = {};
  cardObject.name = addPlacePopupTitleInput.value;
  cardObject.link = addPlacePopupLinkInput.value;
  addNewCard(cardObject);
  closeAddPlacePopup();
}

profileEditButton.addEventListener('click', openEditProfilePopup);

profileEditPopupCloseIcon.addEventListener('click', closeEditProfilePopup);

addPlaceButton.addEventListener('click', openAddPlacePopup);

addPlacePopupCloseIcon.addEventListener('click', closeAddPlacePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler);

addPlacePopupForm.addEventListener('submit', addPlaceFormSubmitHandler);

closeZoomPlacePopupIcon.addEventListener('click', closeZoomPlacePopup);

// Отсюда начинаем валидацию

function validateInput(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement);
  } else {
    hideError(formElement, inputElement);
  }
}

function showError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add('popup__error_visible');
};

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}


function addInputListeners(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement);
    })
  })
}

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll('.popup__form'));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    addInputListeners(formElement);
  })
}

enableValidation();