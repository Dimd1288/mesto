let formSelector;
let inputSelector;
let submitButtonSelector;
let inactiveButtonClass;
let inputErrorClass;
let errorClass;

function validateInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement);
    } else {
        hideError(formElement, inputElement);
    }
}

function showError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

function hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}


function addInputListeners(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButtonState(formElement);
    inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement);
            toggleButtonState(formElement);
        })
    })
}

function enableValidation(params) {
    formSelector = params.formSelector;
    inputSelector = params.inputSelector;
    submitButtonSelector = params.submitButtonSelector;
    inactiveButtonClass = params.inactiveButtonClass;
    inputErrorClass = params.inputErrorClass;
    errorClass = params.errorClass;
    const formsList = Array.from(document.querySelectorAll(formSelector));
    formsList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        addInputListeners(formElement);
    })
}

function isFormValid(inputsList) {
    return inputsList.every((inputElement) => {
        return inputElement.validity.valid;
    })
}

function toggleButtonState(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    if (!isFormValid(inputsList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});