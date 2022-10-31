import {placeZoomPopup, popupImage, popupCaption,openPopup} from '../scripts/script.js';
class Card {
    constructor(data, templateElement) {
        this._data = data;
        this._templateElement = templateElement;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._templateElement)
            .content
            .querySelector('.element')
            .cloneNode(true);
        this._element = cardElement;    
    }

    generateCard() {
        this._getElement();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._data.link;
        this._element.querySelector('.element__title').textContent = this._data.name;
        return this._element;
    }

    _setEventListeners(){
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        });
        this._element.querySelector('.element__basket').addEventListener('click', () =>{
            this._element.remove();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            popupImage.src = this._element.querySelector('.element__image').src;
            popupImage.alt = this._element.querySelector('.element__title').textContent;
            popupCaption.textContent = this._element.querySelector('.element__title').textContent;
            openPopup(placeZoomPopup);
        })
    }
}

export {Card}