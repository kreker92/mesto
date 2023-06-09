"use strict";

import './index.css';

import { initialCards } from '../components/initial-cards.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popupImage = new PopupWithImage('.popup_type_slide');
popupImage.setEventListeners();
function handleCardLinkClick(evt, cardData) {
  // отменяет клик по ссылке <a class="cards__image-link" href="#">...
  evt.preventDefault();

  popupImage.open(cardData);
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


const formProfileEl = document.forms['profile-info'];
const formProfile = new FormValidator(formValidationConfig, formProfileEl);
formProfile.enableValidation();

const profileData = new UserInfo('.profile__name', '.profile__rank');

const popupFormProfile = new PopupWithForm(
  '.popup-profile',
  (evt, values) => {
    evt.preventDefault();
    profileData.setUserInfo(values);
    formProfile.toggleButtonState();
  });
popupFormProfile.setEventListeners();
const btnEditProfile = document.querySelector('.profile__edit');
btnEditProfile.addEventListener('click',
  () => {
    const { name, rank } = profileData.getUserInfo();

    formProfileEl.elements.name.value = name;
    formProfileEl.elements.rank.value = rank;

    formProfile.resetFormValidation();
    popupFormProfile.open();
  }
);

const formCardEl = document.forms['card-info'];
const formCard = new FormValidator(formValidationConfig, formCardEl);
formCard.enableValidation();

const popupFormCard = new PopupWithForm(
  '.popup-card',
  (evt, values) => {
    evt.preventDefault();

    const card = new Card(values, cardTemplate, handleCardLinkClick);
    cardList.addItem(card.get());

    formCardEl.reset();
    formCard.toggleButtonState();
  });
popupFormCard.setEventListeners();
const btnAddCard = document.querySelector('.profile__add');
btnAddCard.addEventListener('click',
  () => {
    formCard.resetFormValidation();
    popupFormCard.open();
  }
);
