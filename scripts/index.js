"use strict";

import { initialCards } from './initial-cards.js';
import Card from './card.js'
import FormValidator from './form-validator.js'

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

function handleBtnAddCardClick() {
  formCard.dispatchEvent(new Event('reset-errors'));
  openPopup(popupFormCard);
}

function handleEditButtonClick() {
  const nameValue = profileName.textContent;
  const jobValue = profileJob.textContent;

  formProfile.elements.name.value = nameValue;
  formProfile.elements.rank.value = jobValue;

  formProfile.dispatchEvent(new Event('reset-errors'));
  openPopup(popupFormProfile);
}

const btnAddCard = document.querySelector('.profile__add');
btnAddCard?.addEventListener('click', handleBtnAddCardClick);

const popupFormCard = document.querySelector('.popup-card');
const formCard = document.forms['card-info'];

const popupFormProfile = document.querySelector('.popup-profile');
const formProfile = document.forms['profile-info'];
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__rank');

const btnEditProfile = document.querySelector('.profile__edit')
btnEditProfile?.addEventListener('click', handleEditButtonClick);

const popupSlideEl = document.querySelector('.popup_type_slide');
const slideImageEl = document.querySelector('.popup__slide-image');
const titleImageEl = document.querySelector('.popup__slide-title');

const popupsList = document.querySelectorAll(`.${popupClass}`);
function initCloseForAllPopups() {
  Array.from(popupsList).forEach(popupEl => {
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

function handleFormCardSubmit(evt) {
  const formCard = evt.target;

  const name = formCard.elements.name.value;
  const link = formCard.elements.link.value;

  const card = new Card({name, link}, cardTemplate, handleCardLinkClick);

  formCard.reset();

  renderCard(card.get());
  closePopup(popupFormCard);
}
formCard.addEventListener('submit', handleFormCardSubmit);

function handleFormProfileSubmit(evt) {
  const formProfile = evt.target;

  const nameValue = formProfile.elements.name.value;
  const jobValue = formProfile.elements.rank.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closePopup(popupFormProfile);
}
formProfile.addEventListener('submit', handleFormProfileSubmit);

const cardsListWrapper = document.querySelector('.cards__list');
function renderCard(card) {
  cardsListWrapper.prepend(card);
}

function createCards(cards) {
  return cards.map(cardData => {
    const card = new Card(cardData, cardTemplate, handleCardLinkClick);
    return card.get();
  });
}
function renderCards(cardsList) {
  cardsList.forEach(renderCard);
}

function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);

  Array.from(formList).forEach((formEl) => {
    const form = new FormValidator(selectors, formEl);
    form.enableValidation();
  });
}

renderCards(createCards(initialCards));

initCloseForAllPopups();
enableValidation(formValidationConfig);
