import { data } from "autoprefixer";

export default class Card {
    constructor(data, templateElement, handleCardClick, openDeletePopup, handleFetchLike, userId) {
        this._data = data;
        this._templateElement = templateElement;
        this._openCard = handleCardClick;
        this._openDeletePopup = openDeletePopup;
        this._id = data._id;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._handleFetchLike = handleFetchLike;
        this._liked = this._isLiked(this._likes);
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
        if (!this._isOwnedByUser()) {
            this._basketElement.remove();
        }
        this._toggleLikedDefault();
    }

    generateCard() {
        this._getElement();
        this._setEventListeners();
        this.setLikesCount(this._likes.length);
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._titleElement.textContent = this._data.name;
        return this._element;
    }

    setLikesCount(likesCount) {
        this._likesCounterElement.textContent = likesCount; 
    }

    _toggleCardLikeState(event) {
        event.target.classList.toggle('element__like_active');
    }

   _isLiked(likes) {
        return likes.some((item) => {
            return item._id === this._userId;
        });
    }

    _isOwnedByUser() {
        return this._ownerId === this._userId;
    }

    _toggleLikedDefault() {
        if (this._isLiked(this._likes)) {
            this._likeElement.classList.toggle('element__like_active');
        }
    }

    _removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeElement.addEventListener('click', (evt) => {
            this._toggleCardLikeState(evt)
            this._handleFetchLike(this._id, this._liked);
            this._liked = !this._liked;
        });
        if(this._isOwnedByUser()) {
            this._basketElement.addEventListener('click', () => {
                this._openDeletePopup(this._id, this._element);
            });
        };
        this._imageElement.addEventListener('click', () => {
            this._openCard(this._imageElement, this._data.name);
        })
    }
}