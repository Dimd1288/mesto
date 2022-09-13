let root = document.querySelector('.root');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileEditPopup = document.querySelector('.popup');
let profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
let profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
let profileEditPopupCloseIcon = profileEditPopupContainer.querySelector('.popup__close-icon');
let profileEditPopupName = profileEditPopupContainer.querySelector('.popup__input_type_name');
let profileEditPopupAbout = profileEditPopupContainer.querySelector('.popup__input_type_about');


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

profileEditButton.addEventListener('click', openEditProfilePopup);

profileEditPopupCloseIcon.addEventListener('click', closeEditProfilePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler);