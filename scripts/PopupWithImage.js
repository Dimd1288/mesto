import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(image, title) {
        this._popupElement.querySelector('.popup__image').src = image.src;
        this._popupElement.querySelector('.popup__image').alt = title;
        this._popupElement.querySelector('.popup__caption').textContent = title;
        super.open();
    }
}