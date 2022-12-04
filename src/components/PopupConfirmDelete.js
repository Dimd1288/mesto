import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._confirmButton = this._popupElement.querySelector('.popup__save-button');
        this._submitFormHandler = submitFormHandler;
    }

    open(id, element) {
       super.open();
       this._cardId = id; 
       this._card = element;
    }

    setEventListeners(){
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._submitFormHandler(this._cardId, this._card)
            .then(() => this.close());
        })
      }
}