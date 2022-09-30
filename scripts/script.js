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
const profileEditPopupNameInput = profileEditPopupContainer.querySelector('.popup__input_type_name');
const profileEditPopupAboutInput = profileEditPopupContainer.querySelector('.popup__input_type_about');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#add-place');
const addPlacePopupContainer = addPlacePopup.querySelector('.popup__container');
const addPlacePopupForm = addPlacePopupContainer.querySelector('.popup__form');
const addPlacePopupCloseIcon = addPlacePopupContainer.querySelector('.popup__close-icon');
const addPlacePopupTitleInput = addPlacePopupContainer.querySelector('.popup__input_type_title');
const addPlacePopupLinkInput = addPlacePopupContainer.querySelector('.popup__input_type_link');
const zoomPlacePopup = document.querySelector('#element-popup');
const closeZoomPlacePopupIcon = zoomPlacePopup.querySelector('.popup__close-icon');

fillPageWithInitialCards();

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
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

function renderCard(card) {
  const elementTemplate = cardsContainer.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__title').textContent = card.name;
  return element;
}

function addNewCard(card) {
  const element = renderCard(card);
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
  cardBasketIcon.addEventListener('click', (event) => {
    element.remove();
  })
}

function loadPlacePopupOpenListener(element) {
  const placeImage = element.querySelector('.element__image');
  const placeTitle = element.querySelector('.element__title');
  placeImage.addEventListener('click', () => {
    zoomPlacePopup.querySelector('.element__popup-image').src = placeImage.src;
    zoomPlacePopup.querySelector('.element__popup-caption').textContent = placeTitle.textContent;
    zoomPlacePopup.querySelector('.element__popup-image').alt = placeTitle.textContent;
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

