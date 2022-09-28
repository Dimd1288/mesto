const root = document.querySelector('.root');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup');
const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
const profileEditPopupCloseIcon = profileEditPopupContainer.querySelector('.popup__close-icon');
const profileEditPopupName = profileEditPopupContainer.querySelector('.popup__input_type_name');
const profileEditPopupAbout = profileEditPopupContainer.querySelector('.popup__input_type_about');
const cardsContainer = document.querySelector('.elements__list');
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
    profileEditPopupName.value = profileName.textContent;
    profileEditPopupAbout.value = profileAbout.textContent;
}

function closeEditProfilePopup() {
    profileEditPopup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = profileEditPopupName.value;
    profileAbout.textContent = profileEditPopupAbout.value;
    closeEditProfilePopup();
}

function fillPageWithInitialCards(){
    const elementTemplate = cardsContainer.querySelector('#element').content;

    initialCards.forEach((item) => {
        const element = elementTemplate.querySelector('.element').cloneNode(true);
        element.querySelector('.element__image').src = item.link;
        element.querySelector('.element__image').alt = item.name;
        element.querySelector('.element__title').textContent = item.name;
        cardsContainer.append(element);
    })
}



profileEditButton.addEventListener('click', openEditProfilePopup);

profileEditPopupCloseIcon.addEventListener('click', closeEditProfilePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler);

document.addEventListener('DOMContentLoaded', fillPageWithInitialCards);