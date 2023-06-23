"use strict";

import './index.css';

import Card from '../components/Card.js';
import Api from '../components/Api.js';
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

/**
 * Инициализация api
 */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  userUrl: 'https://nomoreparties.co/v1/cohort-69/users/me',
  headers: {
    authorization: '273f898a-668c-4a86-9498-3178bf3f9387',
    'Content-Type': 'application/json'
  }
});

/**
 * Инициализация юзера
 */
const formProfileEl = document.forms['profile-info'];
const formProfile = new FormValidator(formValidationConfig, formProfileEl);
formProfile.enableValidation();

const userInfo = new UserInfo(
  {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar',
  },
);
const currentUser = api.getUserInfo()
  .then(res => {
    userInfo.set(res);
  });

/**
 * Форма редактирования юзера
 */
const popupFormProfile = new PopupWithForm(
  '.popup-profile',
  (evt, values, callback) => {
    evt.preventDefault();
    api.setUserInfo({
      ...userInfo.get(),
      ...values,
    })
      .then(res => {
        userInfo.set(res);
        callback();
      });
    formProfile.toggleButtonState();
  });
popupFormProfile.setEventListeners();
const btnEditProfile = document.querySelector('.profile__edit');
btnEditProfile.addEventListener('click',
  () => {
    const { name, about } = userInfo.get();

    formProfileEl.elements.name.value = name;
    formProfileEl.elements.about.value = about;

    formProfile.resetFormValidation();
    popupFormProfile.open();
  }
);


/**
 * Форма изменения аватара
 */
const formAvatarEditEl = document.forms['profile-avatar-edit'];
const formAvatarEdit = new FormValidator(formValidationConfig, formAvatarEditEl);
formAvatarEdit.enableValidation();

const popupFormAvatarEdit = new PopupWithForm(
  '.popup-avatar-edit',
  (evt, { avatar }, callback) => {
    evt.preventDefault();

    api.setUserInfo(
      { avatar }, '/users/me/avatar'
    ).then(res => {
      userInfo.set(res);
      callback();
    });
  });
popupFormAvatarEdit.setEventListeners();
const btnEditAvatar = document.querySelector('.profile__avatar-edit');
btnEditAvatar.addEventListener('click',
  () => {
    const { avatar } = userInfo.get();

    formAvatarEditEl.elements.avatar.value = avatar;

    formAvatarEdit.resetFormValidation();
    formAvatarEdit.toggleButtonState();
    popupFormAvatarEdit.open();
  }
);


/**
 * Инициализация карточек
 */
const popupImage = new PopupWithImage('.popup_type_slide');
popupImage.setEventListeners();
function handleCardLinkClick(evt, cardData) {
  // отменяет клик по ссылке <a class="cards__image-link" href="#">...
  evt.preventDefault();

  popupImage.open(cardData);
}

const cardTemplate = document.querySelector('#card').content;

const cardList = new Section({
  items: [],
  renderer: (item, currentUserId) => {
    const card = new Card(
      item,
      cardTemplate,
      handleCardLinkClick,
      api,
      currentUserId,
      function() {
        popupFormConfirm.setObjToDel(this);
        popupFormConfirm.open();
      }
    );
    return card.get();
  }
}, '.cards__list');

currentUser.then(() => {
  cardList.setCurrentUserId(userInfo.getId());
  api.getInitialCards('cards')
    .then((initialCards) => {
      initialCards.reverse();
      cardList.initItems(initialCards, userInfo.getId());
      cardList.setItems();
    });
})

/**
 * Форма-подтверждение удаления
 */
const popupFormConfirm = new PopupWithForm(
  '.popup-confirm',
  function (evt, _, callback, cardToDel) {
    evt.preventDefault();

    api.delCard(`cards/${cardToDel.getId()}`)
      .then(() => {
        if (cardToDel) {
          cardToDel.remove();
        }
        callback();
      });
  });
popupFormConfirm.setEventListeners();

/**
 * Форма добавления карточки
 */
const formCardEl = document.forms['card-info'];
const formCard = new FormValidator(formValidationConfig, formCardEl);
formCard.enableValidation();

const popupFormCard = new PopupWithForm(
  '.popup-card',
  (evt, values, callback) => {
    evt.preventDefault();

    // const card = new Card(values, cardTemplate, handleCardLinkClick);
    api.addCard('cards', values)
      .then(res => {
        if (Object.keys(res).length) {
          cardList.addItem(res);
        }
        callback();
      });

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
