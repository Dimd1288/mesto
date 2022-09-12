let root = document.querySelector('.root');
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileEditPopup = document.querySelector('.popup');
let profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');
let profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');
let profileEditPopupSaveButton = profileEditPopupContainer.querySelector('.popup__save-button');
let profileEditPopupCloseIcon = profileEditPopupContainer.querySelector('.popup__close-icon');
let profileEditPopupName = profileEditPopupContainer.querySelector('.popup__input_type_name');
let profileEditPopupAbout = profileEditPopupContainer.querySelector('.popup__input_type_about');


function openEditProfilePopup() {
    profileEditPopup.classList.add('popup_opened');
    root.classList.add('root_overflow_hidden')
    let name = profileName.textContent;
    let about = profileAbout.textContent;
    profileEditPopupName.value = name;
    profileEditPopupAbout.value = about;
}

function closeEditProfilePopup() {
    profileEditPopup.classList.remove('popup_opened');
    root.classList.remove('root_overflow_hidden');
}

function formSubmitHandler(event) {
    event.preventDefault();
    let nameFromInput = profileEditPopupName.value;
    let aboutFromInput = profileEditPopupAbout.value;
    profileName.textContent = nameFromInput;
    profileAbout.textContent = aboutFromInput;
}

profileEditButton.addEventListener('click', openEditProfilePopup);

profileEditPopupCloseIcon.addEventListener('click', closeEditProfilePopup);

profileEditPopupForm.addEventListener('submit', formSubmitHandler); 
profileEditPopupSaveButton.addEventListener('click', closeEditProfilePopup);