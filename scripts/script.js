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

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  clearErrors(popupElement);
}

function clearErrors(popupElement) {
  if (!popupElement.contains(popupElement.querySelector('.popup__form'))) {
    return;
  }
  const formElement = popupElement.querySelector('.popup__form');
  const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
  if (!formElement.closest('.popup_opened')) {
    inputsList.forEach((inputElement) => {
      hideError(formElement, inputElement);
    })
  }

}

function addCloseIconListener() {
  const popupsList = Array.from(document.querySelectorAll('.popup'));
  popupsList.forEach((popupElement) => {
    const closeIcon = popupElement.querySelector('.popup__close-icon');
    closeIcon.addEventListener('click', () => {
      closePopup(popupElement);
    })
  })
}

function addCloseOutOfPopupListener() {
  const popupsList = Array.from(document.querySelectorAll('.popup'));
  popupsList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if (!evt.target.closest('.popup__container')) {
        closePopup(popupElement);
      }
    })
  })
}

function addEscapeKeyDownListener() {
  const popupsList = Array.from(document.querySelectorAll('.popup'));
  popupsList.forEach((popupElement) => {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popupElement);
      }
    })
  })
}

function enableClosePopupListeners() {
  addCloseOutOfPopupListener();
  addCloseIconListener();
  addEscapeKeyDownListener();
}


function openEditProfilePopup() {
  openPopup(profileEditPopup);
  profileEditPopupNameInput.value = profileName.textContent;
  profileEditPopupAboutInput.value = profileAbout.textContent;
}

function openAddPlacePopup() {
  addPlacePopupLinkInput.value = '';
  addPlacePopupTitleInput.value = '';
  openPopup(addPlacePopup);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = profileEditPopupNameInput.value;
  profileAbout.textContent = profileEditPopupAboutInput.value;
  closePopup(profileEditPopup);
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
  closePopup(addPlacePopup);
}

enableClosePopupListeners();

profileEditButton.addEventListener('click', openEditProfilePopup);

addPlaceButton.addEventListener('click', openAddPlacePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler);

addPlacePopupForm.addEventListener('submit', addPlaceFormSubmitHandler);
