import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._formElement = document.forms[`${this._popupElement.id}-form`]; 
        this._submitFormHandler = submitFormHandler;
    }

    _getInputValues() {
       this._inputList = this._formElement.querySelectorAll('.popup__input'); 
       this._inputValues = {};
       this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value; 
       })
       return this._inputValues;
    }

    setEventListeners(){
      super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitFormHandler(this._getInputValues());
        this.close();
      }) 
    }

    close() {
      super.close();
      this._formElement.reset();  
    }
}