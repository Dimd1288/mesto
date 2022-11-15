import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupTitle = this._popupElement.querySelector('.popup__caption');
    }
    open(image, title) {
        this._popupImage.src = image.src;
        this._popupImage.alt = title;
        this._popupTitle.textContent = title;
        super.open();
    }
}