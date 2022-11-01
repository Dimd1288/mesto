class Card {
    constructor(data, templateElement, openCard) {
        this._data = data;
        this._templateElement = templateElement;
        this._openCard = openCard;
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
        this._titleElement.textContent = this._data.name;
        this._popupTitle = this._titleElement.textContent;
        this._popupImage = this._imageElement.src;
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
            this._openCard(this._popupTitle, this._popupImage);
        })
    }
}

export { Card }