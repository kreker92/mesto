"use strict";

import '../pages/index.css';
import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function handleBtnAddCardClick(form, popup) {
  form.resetFormValidation();
  popup.open();
}
const btnAddCard = document.querySelector('.profile__add');

function handleEditProfileButtonClick(form, popup) {
  const { name, rank } = profileData.getUserInfo();

  formProfileEl.elements.name.value = name;
  formProfileEl.elements.rank.value = rank;

  form.resetFormValidation();
  popup.open();
}

const formProfileEl = document.forms['profile-info'];
const profileData = new UserInfo('.profile__name', '.profile__rank');
const btnEditProfile = document.querySelector('.profile__edit');


function handleCardLinkClick(evt, cardData) {
  // отменяет клик по ссылке <a class="cards__image-link" href="#">...
  evt.preventDefault();

  const popup = new PopupWithImage('.popup_type_slide', cardData);
  popup.open();
  popup.setEventListeners();
}

function handleFormCardSubmit(evt, form, validation, values) {
  evt.preventDefault();

  cardList.addItem(values);

  form.reset();
  validation.toggleButtonState();
}

function handleFormProfileSubmit(evt, _, validation, values) {
  evt.preventDefault();

  profileData.setUserInfo(values);

  validation.toggleButtonState();
}

const cardTemplate = document.querySelector('#card').content;
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardLinkClick);
    return card.get();
  }
}, '.cards__list');
cardList.setItems();


function initForms(selectors) {
  const formProfile = new FormValidator(selectors, formProfileEl);
  formProfile.enableValidation();

  const popupFormProfile = new PopupWithForm(
    '.popup-profile',
    {
      handleSubmit: handleFormProfileSubmit,
      form: formProfileEl,
      validation: formProfile,
      inputNames: ['name', 'rank'],
    });
  popupFormProfile.setEventListeners();
  btnEditProfile.addEventListener('click',
    () => handleEditProfileButtonClick(formProfile, popupFormProfile)
  );

  const formCardEl = document.forms['card-info'];
  const formCard = new FormValidator(selectors, formCardEl);
  formCard.enableValidation();

  const popupFormCard = new PopupWithForm(
    '.popup-card',
    {
      handleSubmit: handleFormCardSubmit,
      form: formCardEl,
      validation: formCard,
      inputNames: ['name', 'link'],
    });
  popupFormCard.setEventListeners();
  btnAddCard.addEventListener('click',
    () => handleBtnAddCardClick(formCard, popupFormCard)
  );
}

initForms(formValidationConfig);
