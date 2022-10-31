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

    _validateInput(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement);
        } else {
            this._hideError(formElement, inputElement);
        }
    }

    _showError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }


    _addInputListeners(formElement) {
        const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._toggleButtonState(formElement);
        inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(formElement, inputElement);
                this._toggleButtonState(formElement);
            })
        })
    }

    _isFormValid(inputsList) {
        return inputsList.every((inputElement) => {
            return inputElement.validity.valid;
        })
    }

    _toggleButtonState(formElement) {
        const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        if (!this._isFormValid(inputsList)) {
            this.disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    _enableSubmitButton() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }

    disableSubmitButton() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    clearErrors() {
        const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputsList.forEach((inputElement) => {
            this._hideError(this._formElement, inputElement);
        })
    }

    enableValidation() {
        this._addInputListeners(this._formElement);
    }
}

export { FormValidator }