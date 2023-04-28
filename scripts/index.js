"use strict";

const popupClass = 'popup';
const popupOpenedClass = 'popup_opened';
const popupBtnCloseClass = 'popup__close';

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
  resetFormValidation(popupFormCard);
  openPopup(popupFormCard);
}

function handleEditButtonClick() {
  const nameValue = profileName.textContent;
  const jobValue = profileJob.textContent;

  formProfile.elements.name.value = nameValue;
  formProfile.elements.rank.value = jobValue;

  resetFormValidation(popupFormProfile);
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

const popupSlideElement = document.querySelector('.popup_type_slide');
const slideImageElement = document.querySelector('.popup__slide-image');
const titleImageElement = document.querySelector('.popup__slide-title');

const popupsList = document.querySelectorAll(`.${popupClass}`);
function initCloseForAllPopups() {
  Array.from(popupsList).forEach(popupElement => {
    popupElement.addEventListener('click', (evt) => {
      const isOverlay = evt.target.classList.contains(popupClass);
      const isCloseBtn = evt.target.classList.contains(popupBtnCloseClass)
      if (isOverlay || isCloseBtn) {
        closePopup(popupElement);
      }
    });
  });
}

const cardTemplate = document.querySelector('#card').content;
function createCard({name, link}) {
  function removeCard(card) {
    card.remove();
  }

  function toggleCardLike({ currentTarget }) {
    currentTarget.classList.toggle('cards__like_active');
  }

  function handleCardLinkClick(evt, name, link) {
    // отменяет клик по ссылке <a class="cards__image-link" href="#">...
    evt.preventDefault();

    slideImageElement.setAttribute('alt', name);
    slideImageElement.setAttribute('src', link);
    titleImageElement.textContent = name;

    openPopup(popupSlideElement);
  }

  const card = cardTemplate.querySelector('.cards__card').cloneNode(true);

  const nameElement = card.querySelector('.cards__name');
  const linkElement = card.querySelector('.cards__image-link');
  const imageElement = card.querySelector('.cards__image');
  const trashElement = card.querySelector('.cards__trash');
  const likeElement = card.querySelector('.cards__like');

  nameElement.textContent = name;
  imageElement.setAttribute('alt', name);
  imageElement.setAttribute('src', link);

  linkElement.addEventListener('click', (evt) => handleCardLinkClick(evt, name, link))
  likeElement.addEventListener('click', toggleCardLike);
  trashElement.addEventListener('click', () => removeCard(card));

  return card;
}

function handleFormCardSubmit(evt) {
  const formCard = evt.target;

  const name = formCard.elements.name.value;
  const link = formCard.elements.link.value;

  const card = createCard({name, link});

  formCard.reset();

  renderCard(card);
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
  return cards.map(card => createCard(card));
}
function renderCards(cardsList) {
  cardsList.forEach(renderCard);
}

renderCards(createCards(initialCards));

initCloseForAllPopups();
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
