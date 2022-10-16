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
const profileEditSubmitButton = profileEditPopup.querySelector('.popup__save-button');

const placeAddButton = document.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#add-place');
const placeAddPopupContainer = placeAddPopup.querySelector('.popup__container');
const placeAddPopupForm = placeAddPopupContainer.querySelector('.popup__form');
const placeAddPopupCloseIcon = placeAddPopupContainer.querySelector('.popup__close-icon');
const placeAddPopupTitleInput = placeAddPopupContainer.querySelector('#title-input');
const placeAddPopupLinkInput = placeAddPopupContainer.querySelector('#link-input');
const zoomPlacePopup = document.querySelector('#element-popup');
const popupImage = zoomPlacePopup.querySelector('.popup__image');
const popupCaption = zoomPlacePopup.querySelector('.popup__caption');
const closeZoomPlacePopupIcon = zoomPlacePopup.querySelector('.popup__close-icon');
const popupsList = Array.from(document.querySelectorAll('.popup'));
const placeAddsubmitButton = placeAddPopup.querySelector('.popup__save-button');

const elementTemplate = cardsContainer.querySelector('#element').content;

fillPageWithInitialCards();

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

function disableSubmitButton(buttonElement) {
  buttonElement.classList.add('popup__save-button_disabled');
  buttonElement.setAttribute('disabled', true);
}

function handleSubmitForm(event) {
  event.preventDefault();
  profileName.textContent = profileEditPopupNameInput.value;
  profileAbout.textContent = profileEditPopupAboutInput.value;
  closePopup(profileEditPopup);
  disableSubmitButton(profileEditSubmitButton);
}

function createCard(card) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = card.name;
  element.querySelector('.element__title').textContent = card.name;
  loadLikeButtonClickListener(element);
  loadBasketButtonClickListener(element);
  loadPlacePopupOpenListener(element);
  return element;
}

function addNewCard(card) {
  const element = createCard(card);
  cardsContainer.prepend(element);
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

function handleSubmitAddPlaceForm(event) {
  event.preventDefault();
  const cardObject = {};
  cardObject.name = placeAddPopupTitleInput.value;
  cardObject.link = placeAddPopupLinkInput.value;
  addNewCard(cardObject);
  closePopup(placeAddPopup);
  disableSubmitButton(placeAddsubmitButton);
}

enableClosePopupListeners();

profileEditButton.addEventListener('click', openEditProfilePopup);

placeAddButton.addEventListener('click', openAddPlacePopup);

profileEditPopupForm.addEventListener('submit', handleSubmitForm);

placeAddPopupForm.addEventListener('submit', handleSubmitAddPlaceForm);
