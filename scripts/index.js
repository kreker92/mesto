"use strict";

const popupClass = 'popup';
const popupOpenedClass = 'popup_opened';
const popupCloseBtnClass = 'popup__close';

const editProfileForm = {
  popup: document.querySelector('.popup-profile'),
  inputs: {
    name: document.forms['profile-info'].elements.name,
    job: document.forms['profile-info'].elements.rank,
  },
  fields: {
    name: document.querySelector('.profile__name'),
    job: document.querySelector('.profile__rank'),
  },
  btns: {
    edit: document.querySelector('.profile__edit'),
  },
};
const addCardForm = {
  popup: document.querySelector('.popup-card'),
  inputs: {
    name: document.querySelector('.popup__input_type_card-name'),
    link: document.querySelector('.popup__input_type_card-image-url'),
  },
  btns: {
    add: document.querySelector('.profile__add'),
  },
};

const popupList = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card').content;
const cardsListElement = document.querySelector('.cards__list');

const popupSlideElement = document.querySelector('.popup_type_slide');
const slideImageElement = document.querySelector('.popup__slide-image');
const titleImageElement = document.querySelector('.popup__slide-title');

function initOpenPopup() {
  editProfileForm.btns.edit.addEventListener('click', handleEditButtonClick);
  addCardForm.btns.add.addEventListener('click', handleAddCardButtonClick);
}

function handleEditButtonClick() {
  const nameValue = editProfileForm.fields.name.textContent;
  const jobValue = editProfileForm.fields.job.textContent;

  editProfileForm.inputs.name.value = nameValue;
  editProfileForm.inputs.job.value = jobValue;

  openPopup(editProfileForm.popup);
}

function handleAddCardButtonClick() {
  openPopup(addCardForm.popup);
}

function openPopup(popupElement) {
  popupElement.classList.add(popupOpenedClass);

  const handleKeyDownEscape = (evt) => {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', handleKeyDownEscape);
      closePopup(popupElement);
    }
  };

  document.addEventListener('keydown', handleKeyDownEscape);
}

function initClosePopup() {
  Array.from(popupList).forEach(popupElement => {
    popupElement.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains(popupClass) ||
        evt.target.classList.contains(popupCloseBtnClass)
      ) {
        closePopup(popupElement)
      }
    });
  });
}

function closePopup(popupElement) {
  popupElement.classList.remove(popupOpenedClass);
}

function initCards () {
  initialCards.forEach(cardData => addCard(renderCard(cardData)));
}

function addCard(cardNode) {
  cardsListElement.prepend(cardNode);
}

function renderCard({name, link}) {
  const card = cardTemplate.cloneNode(true);

  const cardElement = card.querySelector('.cards__card');
  const nameElement = card.querySelector('.cards__name');
  const linkElement = card.querySelector('.cards__image-link');
  const imageElement = card.querySelector('.cards__image');
  const trashElement = card.querySelector('.cards__trash');
  const likeElement = card.querySelector('.cards__like');

  nameElement.textContent = name;
  imageElement.setAttribute('alt', name);
  imageElement.setAttribute('src', link);

  linkElement.addEventListener('click', (evt) => handleCardLinkClick(evt, name, link))
  likeElement.addEventListener('click', () => toggleCardLike(likeElement));
  trashElement.addEventListener('click', () => removeCard(cardElement));

  return card;
}

function handleCardLinkClick(evt, name, link) {
  evt.preventDefault();

  slideImageElement.setAttribute('alt', name);
  slideImageElement.setAttribute('src', link);
  titleImageElement.textContent = name;

  openPopup(popupSlideElement);
}

function toggleCardLike(likeElement) {
  likeElement.classList.toggle('cards__like_active');
}

function removeCard(card) {
  card.remove();
}

function initFormsSubmit() {
  editProfileForm.popup.addEventListener('submit', handleFormProfileSubmit)
  addCardForm.popup.addEventListener('submit', handleFormCardSubmit)
}

function handleFormProfileSubmit(evt) {
  const nameValue = editProfileForm.inputs.name.value;
  const jobValue = editProfileForm.inputs.job.value;

  editProfileForm.fields.name.textContent = nameValue;
  editProfileForm.fields.job.textContent = jobValue;

  closePopup(editProfileForm.popup);
}

function handleFormCardSubmit(evt) {
  const name = addCardForm.inputs.name.value;
  const link = addCardForm.inputs.link.value;

  const card = renderCard({name, link});

  evt.target.reset();

  addCard(card);
  closePopup(addCardForm.popup);
}

initCards();
initOpenPopup();
initClosePopup();
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
initFormsSubmit();
