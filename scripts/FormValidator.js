class FormValidator {
    constructor(dataSettings, formElement) {
        this._formSelector = dataSettings.formSelector;
        this._inputSelector = dataSettings.inputSelector;
        this._submitButtonSelector = dataSettings.submitButtonSelector;
        this._inactiveButtonClass = dataSettings.inactiveButtonClass;
        this._inputErrorClass = dataSettings.inputErrorClass;
        this._errorClass = dataSettings.errorClass;
        this._formElement = formElement;
    }

    _validateInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }


    _addInputListeners() {
        const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._toggleButtonState();
        inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _isFormValid(inputsList) {
        return inputsList.every((inputElement) => {
            return inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (!this._isFormValid(inputsList)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    _enableSubmitButton() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }

    _disableSubmitButton() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    _addSubmitFormListener() {
        this._formElement.addEventListener('submit', () => {
            this._disableSubmitButton();
        });
    }

    clearErrors() {
        const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputsList.forEach((inputElement) => {
            this._hideError(inputElement);
        })
    }

    enableValidation() {
        this._addInputListeners();
        this._addSubmitFormListener();
    }
}

export { FormValidator }