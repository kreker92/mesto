"use strict";

const popupModalOpenedClass = 'popup_opened';

const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = document.querySelector('.popup__close');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input-text_type_profile-name');
const jobInput = document.querySelector('.popup__input-text_type_profile-rank');

// Выберите элементы, куда должны быть вставлены значения полей
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__rank');

function openModal() {
  popupElement.classList.add(popupModalOpenedClass);
}

function closeModal() {
  popupElement.classList.remove(popupModalOpenedClass);
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

    closeModal();
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

  openModal();
}

editButtonElement.addEventListener('click', handleEditButtonClick);
popupCloseBtnElement.addEventListener('click', closeModal);
