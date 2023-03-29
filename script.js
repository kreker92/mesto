"use strict";

const popupModalOpenedClass = 'popup_opened';
const pageModalOpenedClass = 'page_modal-opened';

const popupElement = document.querySelector('.popup');
const pageElement = document.querySelector('.page');
const closeElement = popupElement.querySelector('.popup__close');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__rank');

// Выберите элементы, куда должны быть вставлены значения полей
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__rank');

function toggleModal () {
  pageElement.classList.toggle(pageModalOpenedClass);
  popupElement.classList.toggle(popupModalOpenedClass);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставьте новые значения с помощью textContent
    nameField.textContent = nameValue;
    jobField.textContent = jobValue;

    toggleModal();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const editButtonElement = document.querySelector('.profile__edit');

function handleEditButtonClick () {
  const nameValue = nameField.textContent;
  const jobValue = jobField.textContent;

  nameInput.value = nameValue;
  jobInput.value = jobValue;

  toggleModal();
}

editButtonElement.addEventListener('click', handleEditButtonClick);

closeElement.addEventListener('click', toggleModal);
