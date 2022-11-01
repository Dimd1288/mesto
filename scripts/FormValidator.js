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
        this._toggleButtonState();
        this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _isFormValid() {
        return this._inputsList.every((inputElement) => {
            return inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (!this._isFormValid()) {
            this._disableSubmitButton(this._buttonElement);
        } else {
            this._enableSubmitButton(this._buttonElement);
        }
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled', true);
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _addSubmitFormListener() {
        this._formElement.addEventListener('submit', () => {
            this._disableSubmitButton();
        });
    }

    clearErrors() {
        this._inputsList.forEach((inputElement) => {
            this._hideError(inputElement);
        })
    }

    enableValidation() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._addInputListeners();
        this._addSubmitFormListener();
    }
}

export { FormValidator }