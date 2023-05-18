"use strict";

import { initialCards } from './initial-cards.js';
import Card from './Card.js'
import FormValidator from './FormValidator.js'

const popupClass = 'popup';
const popupOpenedClass = 'popup_opened';
const popupBtnCloseClass = 'popup__close';

const cardTemplate = document.querySelector('#card').content;

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);

  document.removeEventListener('keydown', handleKeyDownEscape);
}

const handleKeyDownEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector(`.${popupOpenedClass}`);
    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
};

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
  document.addEventListener('keydown', handleKeyDownEscape);
}

function handleBtnAddCardClick(form) {
  form.resetFormValidation();
  openPopup(popupFormCard);
}
const btnAddCard = document.querySelector('.profile__add');

function handleEditButtonClick(form) {
  const nameValue = profileName.textContent;
  const jobValue = profileJob.textContent;

  formProfileEl.elements.name.value = nameValue;
  formProfileEl.elements.rank.value = jobValue;

  form.resetFormValidation();
  openPopup(popupFormProfile);
}

const popupFormCard = document.querySelector('.popup-card');
const formCardEl = document.forms['card-info'];

const popupFormProfile = document.querySelector('.popup-profile');
const formProfileEl = document.forms['profile-info'];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__rank');

const btnEditProfile = document.querySelector('.profile__edit');

const popupSlideEl = document.querySelector('.popup_type_slide');
const slideImageEl = document.querySelector('.popup__slide-image');
const titleImageEl = document.querySelector('.popup__slide-title');

const popupsList = document.querySelectorAll(`.${popupClass}`);
function initCloseForAllPopups() {
  popupsList.forEach(popupEl => {
    popupEl.addEventListener('click', (evt) => {
      const isOverlay = evt.target.classList.contains(popupClass);
      const isCloseBtn = evt.target.classList.contains(popupBtnCloseClass)

      if (isOverlay || isCloseBtn) {
        closePopup(popupEl);
      }
    });
  });
}

function handleCardLinkClick(evt, name, link) {
  // отменяет клик по ссылке <a class="cards__image-link" href="#">...
  evt.preventDefault();

  slideImageEl.setAttribute('alt', name);
  slideImageEl.setAttribute('src', link);
  titleImageEl.textContent = name;

  openPopup(popupSlideEl);
}

function handleFormCardSubmit(evt, form) {
  evt.preventDefault();

  const formCard = evt.target;

  const name = formCard.elements.name.value;
  const link = formCard.elements.link.value;

  const card = createCard({name, link})

  formCard.reset();
  form.toggleButtonState();

  renderCard(card);
  closePopup(popupFormCard);
}

function handleFormProfileSubmit(evt, form) {
  evt.preventDefault();

  const formProfile = evt.target;

  const nameValue = formProfile.elements.name.value;
  const jobValue = formProfile.elements.rank.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  form.toggleButtonState();

  closePopup(popupFormProfile);
}

const cardsListWrapper = document.querySelector('.cards__list');
function renderCard(card) {
  cardsListWrapper.prepend(card);
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardLinkClick);

  return card.get();
}

function createCards(cards) {
  return cards.map(createCard);
}
function renderCards(cardsList) {
  cardsList.forEach(renderCard);
}

function initForms(selectors) {
  const formProfile = new FormValidator(selectors, formProfileEl);
  formProfile.enableValidation();
  btnEditProfile.addEventListener('click', () => handleEditButtonClick(formProfile));
  formProfileEl.addEventListener('submit', (evt) => handleFormProfileSubmit(evt, formProfile));

  const formCard = new FormValidator(selectors, formCardEl);
  formCard.enableValidation();
  btnAddCard.addEventListener('click', () => handleBtnAddCardClick(formCard));
  formCardEl.addEventListener('submit', (evt) => handleFormCardSubmit(evt, formCard));
}
initForms(formValidationConfig);

renderCards(createCards(initialCards));

initCloseForAllPopups();
