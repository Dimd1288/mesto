function validateInput(formElement, inputElement, params) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, params);
    } else {
        hideError(formElement, inputElement, params);
    }
}

function showError(formElement, inputElement, params) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(params.errorClass);
};

function hideError(formElement, inputElement, params) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
}


function addInputListeners(formElement, params) {
    const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
    toggleButtonState(formElement, params);
    inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(formElement, inputElement, params);
            toggleButtonState(formElement, params);
        })
    })
}

function enableValidation(params) {
    const formSelector = params.formSelector;
    errorClass = params.errorClass;
    const formsList = Array.from(document.querySelectorAll(formSelector));
    formsList.forEach((formElement) => {
        addInputListeners(formElement, params);
    })
}

function isFormValid(inputsList) {
    return inputsList.every((inputElement) => {
        return inputElement.validity.valid;
    })
}

function toggleButtonState(formElement, params) {
    const inputsList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    if (!isFormValid(inputsList)) {
        buttonElement.classList.add(params.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function clearErrors(popupElement, params) {
    if (!popupElement.contains(popupElement.querySelector('.popup__form'))) {
      return;
    }
    const formElement = popupElement.querySelector('.popup__form');
    const inputsList = Array.from(formElement.querySelectorAll('.popup__input'));
    if (!formElement.closest('.popup_opened')) {
      inputsList.forEach((inputElement) => {
        hideError(formElement, inputElement, params);
      })
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