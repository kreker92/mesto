"use strict";

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-error`);
}

function showInputError(selectors, formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.classList.add(selectors.errorClass);
  errorElement.textContent = inputElement.validationMessage;

  inputElement.classList.add(selectors.inputErrorClass);
}

function hideInputError(selectors, formElement, inputElement) {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';

  inputElement.classList.remove(selectors.inputErrorClass);
}

function checkInputValidity(selectors, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

function toggleButtonState(selectors, inputList, buttonElement) {
  if (inputList.some(inputElement => !inputElement.validity.valid)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setValidationEventListeners(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonState(selectors, inputList, buttonElement);
  });

  toggleButtonState(selectors, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(selectors, formElement, inputElement);
      toggleButtonState(selectors, inputList, buttonElement);
    })
  });
}

let resetFormValidation;
function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);

  Array.from(formList).forEach((formElement) => {
    setValidationEventListeners(selectors, formElement);
  });

  resetFormValidation = ((popupElement) => {
    const formElement = popupElement.querySelector(selectors.formSelector);
    if (formElement) {
      const inputList =
        formElement.querySelectorAll(selectors.inputSelector);
      inputList.forEach((inputElement) => {
        hideInputError(selectors, formElement, inputElement);
      });
    }
  });
}
