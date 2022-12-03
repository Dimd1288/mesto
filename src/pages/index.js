import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import { validationParameters } from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'd336096d-2d8c-44f4-af75-d1804dff5c64',
    'Content-Type': 'application/json'
  }
});

let userId = '';

const profileEditButton = document.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('#edit-profile');

const profileEditPopupContainer = profileEditPopup.querySelector('.popup__container');

const profileEditPopupForm = profileEditPopupContainer.querySelector('.popup__form');

const placeAddButton = document.querySelector('.profile__add-button');

const placeAddPopup = document.querySelector('#add-place');

const avatarEditButton = document.querySelector('.profile__photo-button')

const avatarUpdatePopup = document.querySelector('#update-avatar');

const avatarUpdatePopupContainer = avatarUpdatePopup.querySelector('.popup__container');

const avatarUpdatePopupForm = avatarUpdatePopupContainer.querySelector('.popup__form');

const placeAddPopupContainer = placeAddPopup.querySelector('.popup__container');

const placeAddPopupForm = placeAddPopupContainer.querySelector('.popup__form');

const profileEditFormValidator = new FormValidator(validationParameters, profileEditPopupForm);

const placeAddFormValidator = new FormValidator(validationParameters, placeAddPopupForm);

const avatarUpdateFormValidator = new FormValidator(validationParameters, avatarUpdatePopupForm);

const popupWithImage = new PopupWithImage('#element-popup');

const popupConfirmImageDelete = new PopupConfirmDelete('#delete-place', (id, card) => {
  api.deleteCard(id)
    .then(card.remove())
    .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
});

const popupWithPlaceForm = new PopupWithForm('#add-place', (formInputValues) => {
  return api.postNewCard(formInputValues)
    .then(res => cardList.addItem(createCard(res)))
    .catch(err => console.log(`От сервера вернулась ошибка ${err}`))
    .finally(() => {
      placeAddFormValidator.disableSubmitButton();
    });
});

const popupWithUserInfoForm = new PopupWithForm('#edit-profile', (formInputValues) => {
  return api.patchUser(formInputValues)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => console.log(`От сервера вернулась ошибка: ${err}`))
    .finally(() => {
      profileEditFormValidator.disableSubmitButton();
    });
});

const popupWithAvatarUrlForm = new PopupWithForm('#update-avatar', (formInputValues) => {
  return api.patchAvatar(formInputValues).then(res => {
    userInfo.setUserInfo(res);
  })
    .catch(err => console.log(`От сервера вернулась ошибка: ${err}`))
    .finally(() => {
      avatarUpdateFormValidator.disableSubmitButton();
    });
});

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    userInfo.setUserInfo(profileData);
    userId = profileData._id;
    cardList.renderItems(initialCards.reverse());
  })
  .catch(err => console.log(`При получении данных возникла ошибка: ${err}`));

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements__list');


const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about',
  userAvatarSelector: '.profile__photo',
}
);

function createCard(cardData) {
  const card = new Card(cardData, "#element",
    (image, title) => { popupWithImage.open(image, title); },
    (id, element) => {
      popupConfirmImageDelete.open(id, element);
    }, (cardId, isLiked) => {
      if (!isLiked) {
        return api.putLike(cardId);
      } else {
        return api.deleteLike(cardId);
      }
    }, userId);
  return card.generateCard();
}

popupWithImage.setEventListeners();

popupWithPlaceForm.setEventListeners();

popupWithUserInfoForm.setEventListeners();

popupWithAvatarUrlForm.setEventListeners();

popupConfirmImageDelete.setEventListeners();

profileEditFormValidator.enableValidation();

placeAddFormValidator.enableValidation();

avatarUpdateFormValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  profileEditFormValidator.clearErrors();
  popupWithUserInfoForm.open();
  popupWithUserInfoForm.setDefaultInputValues(userInfo.getUserInfo());
});

placeAddButton.addEventListener('click', () => {
  placeAddFormValidator.clearErrors();
  popupWithPlaceForm.open();
});

avatarEditButton.addEventListener('click', () => {
  avatarUpdateFormValidator.clearErrors();
  popupWithAvatarUrlForm.open();
})