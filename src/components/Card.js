export default class Card {
    constructor(data, templateElement, handleCardClick) {
        this._data = data;
        this._templateElement = templateElement;
        this._openCard = handleCardClick;
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
    }

    generateCard() {
        this._getElement();
        this._setEventListeners();
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.title;
        this._titleElement.textContent = this._data.title;
        return this._element;
    }

    _toggleCardLikeState(event) {
        event.target.classList.toggle('element__like_active'); 
    }

    _removeCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._toggleCardLikeState);
        this._element.querySelector('.element__basket').addEventListener('click', () => {
            this._removeCard();
        });
        this._imageElement.addEventListener('click', () => {
            this._openCard(this._imageElement, this._data.title);
        })
    }
}