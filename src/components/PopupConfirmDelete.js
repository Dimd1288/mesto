import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitFormHandler();
          this.close();
        }) 
      }
}