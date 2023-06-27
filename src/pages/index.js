"use strict";

import './index.css';

import Card from '../components/Card.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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

let userId = null;
const userInfo = new UserInfo(
  {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar',
  },
);
const currentUser = api.getUserInfo()
  .then(res => {
    userId = res._id;
    userInfo.set(res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

/**
 * Форма редактирования юзера
 */
const popupFormProfile = new PopupWithForm(
  '.popup-profile',
  (evt, values, callback) => {
    evt.preventDefault();
    api.setUserInfo(values)
      .then((res) => {
        callback();
        formProfile.toggleButtonState();
        popupFormProfile.close();
        userInfo.set(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
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
      popupFormAvatarEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  });
popupFormAvatarEdit.setEventListeners();
const btnEditAvatar = document.querySelector('.profile__avatar-edit');
btnEditAvatar.addEventListener('click',
  () => {
    formAvatarEditEl.reset();
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
  renderer: (item) => {
    const card = new Card(
      item,
      cardTemplate,
      handleCardLinkClick,
      function () {
        api.setLike(`cards/${this._id}/likes`, {
          method:
            this._likes.map(user => user._id)
              .includes(userId) ? 'DELETE' : 'PUT',
        }).then((res) => {
          this._likes = res.likes;
          this._likeCountEl.textContent = this._renderLikesCount();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      },
      userId,
      function() { // confirm
        popupFormConfirm.setObjToDel(this);
        popupFormConfirm.open();
      }
    );
    return card.get();
  }
}, '.cards__list');

currentUser.then(() => {
  api.getInitialCards('cards')
    .then((initialCards) => {
      initialCards.reverse();
      cardList.initItems(initialCards);
      cardList.setItems(userInfo);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});

/**
 * Форма-подтверждение удаления
 */
const popupFormConfirm = new PopupWithConfirm(
  '.popup-confirm',
  function (evt, _, callback, cardToDel) {
    evt.preventDefault();

    api.delCard(`cards/${cardToDel.getId()}`)
      .then(() => {
        if (cardToDel) {
          cardToDel.remove();
        }
        callback();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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

    api.addCard('cards', values)
      .then(res => {
        if (Object.keys(res).length) {
          cardList.addItem(res, userId);
          formCardEl.reset();
          formCard.toggleButtonState();
        }
        popupFormCard.close();
        callback();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

  });
popupFormCard.setEventListeners();
const btnAddCard = document.querySelector('.profile__add');
btnAddCard.addEventListener('click',
  () => {
    formCard.resetFormValidation();
    popupFormCard.open();
  }
);
