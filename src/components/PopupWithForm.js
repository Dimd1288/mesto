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
        const initialText = this._buttonElement.textContent;
        this._buttonElement.textContent = 'Сохранение...';
        this._submitFormHandler(this._getInputValues())
          .then(() => this.close())
          .finally(() => {
            this._buttonElement.textContent = initialText;
          });
      }) 
    }

    close() {
      super.close();
      this._formElement.reset();  
    }
}