import { data } from "autoprefixer";

export default class Card {
    constructor(data, templateElement, handleCardClick, openDeletePopup, getUserId) {
        this._data = data;
        this._templateElement = templateElement;
        this._openCard = handleCardClick;
        this._openDeletePopup = openDeletePopup;
        this._id = data._id;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._getUserId = getUserId;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._templateElement)
            .content
            .querySelector('.element')
            .cloneNode(true);
        this._element = cardElement;
        this._imageElement = this._element.querySelector('.element__image');
        this._titleElement = this._element.querySelector('.element__title');
        this._likeElement = this._element.querySelector('.element__like');
        this._likesCounterElement = this._element.querySelector('.element__like-counter');
        this._basketElement = this._element.querySelector('.element__basket');
        this._getUserId.then(res => {
            if (this._ownerId !== res) {
                this._basketElement.remove();
            }
        })
        this._toggleLikedDefault();
    }

    generateCard() {
        this._getElement();
        this._setEventListeners();
        this._likesCounterElement.textContent = this._likes.length;
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._titleElement.textContent = this._data.name;
        return this._element;
    }

    _toggleCardLikeState(event) {
        event.target.classList.toggle('element__like_active'); 
    }

    _isLiked(userId) {
        return this._likes.some((item) => {
            return item._id === userId;
        });
    }

    _toggleLikedDefault() {
        this._getUserId.then(res => {
            if(this._isLiked(res)){
                this._likeElement.classList.toggle('element__like_active');
            }
        })
    }

    _removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', this._toggleCardLikeState);
        this._basketElement.addEventListener('click', () => {
            this._openDeletePopup();
        });
        this._imageElement.addEventListener('click', () => {
            this._openCard(this._imageElement, this._data.name);
        })
    }
}