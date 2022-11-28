import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
    }

    setEventListeners(){
        super.setEventListeners();
       
      }
}