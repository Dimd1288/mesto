export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown',  this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened'); 
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const popupOpened = new Popup('.popup_opened');
            popupOpened.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')){
                this.close();
            }
        })
    }
}