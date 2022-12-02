import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._formElement = document.forms[`${this._popupElement.id}-form`];
        this._buttonElement = this._formElement.querySelector('.popup__save-button');
        this._buttonInitialText = this._buttonElement.textContent;
        this._submitFormHandler = submitFormHandler;
        this._inputList = this._formElement.querySelectorAll('.popup__input'); 
    }

    _getInputValues() {
       this._inputValues = {};
       this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value; 
       })
       return this._inputValues;
    }

    setDefaultInputValues(userData) {
        this._inputList.forEach((input) => {
            input.value = userData[input.name];
        })
    }

    setEventListeners(){
      super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.renderLoading(true);
        this._submitFormHandler(this._getInputValues());
        this.close();
      }) 
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._buttonElement.textContent = 'Сохранение...';
      } else {
        this._buttonElement.textContent = this._buttonInitialText;
      }
    }

    close() {
      super.close();
      this._formElement.reset();  
    }
}