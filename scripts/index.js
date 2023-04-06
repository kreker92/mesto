"use strict";

const popupModalOpenedClass = 'popup_opened';
const popupElement = document.querySelector('.popup');
const popupSlideClass = 'popup_view_slide';

function openModal(isSlideView) {
  if (isSlideView) {
    popupElement.classList.add(popupSlideClass)
  }
  popupElement.classList.add(popupModalOpenedClass);
}

function closeModal() {
  popupElement.classList.remove(popupModalOpenedClass, popupSlideClass);
}

function removeCard(el) {
  el.remove();
}

const cardsListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card');
function renderCards() {
  cardsListElement.innerHTML = '';
  initialCards.forEach((...props) => {
    renderCard(...props);
  });
}
function renderCard({ name, link }) {
  const card = cardTemplate.content.cloneNode(true);

  const cardElement = card.querySelector('.cards__card');
  const imageElementLink = card.querySelector('.cards__image-link');
  const imageElement = card.querySelector('.cards__image');
  const nameElement = card.querySelector('.cards__name');
  const likeElement = card.querySelector('.cards__like');
  const trashElement = card.querySelector('.cards__trash');

  imageElement.setAttribute('alt', name);
  imageElement.setAttribute('src', link);
  nameElement.textContent = name;

  cardsListElement.prepend(card);
  trashElement.addEventListener('click', () => removeCard(cardElement));
  likeElement.addEventListener('click', () => handleLikeClick(likeElement));
  imageElementLink.addEventListener('click', (evt) => handleImageLinkClick(evt, name, link));
}

function renderForm(form, handleSubmit) {
  const formElement = form.querySelector('.popup__form');
  formElement.addEventListener('submit', handleSubmit);

  renderElement(form);
}

function renderElement(element, modalClass) {
  const popupCloseBtnElement = element.querySelector('.popup__close');
  popupCloseBtnElement.addEventListener('click', (evt) => closeModal(evt, modalClass));

  popupElement.innerHTML = '';
  popupElement.append(element);
}

const popupProfileFormTemplate = document.querySelector('#popup-profile');
const nameField = document.querySelector('.profile__name');
const jobField = document.querySelector('.profile__rank');
function renderProfileForm() {
  const form = popupProfileFormTemplate.content.cloneNode(true);

  const nameInput = form.querySelector('.popup__input-text_type_profile-name');
  const jobInput = form.querySelector('.popup__input-text_type_profile-rank');
  const nameValue = nameField.textContent;
  const jobValue = jobField.textContent;
  nameInput.value = nameValue;
  jobInput.value = jobValue;

  renderForm(form, handleProfileFormSubmit);
}

function handleEditButtonClick () {
  renderProfileForm();
  openModal();
}
const editButtonElement = document.querySelector('.profile__edit');
editButtonElement.addEventListener('click', handleEditButtonClick);

const popupCardFormTemplate = document.querySelector('#popup-add-card');
function renderElementForm() {
  const form = popupCardFormTemplate.content.cloneNode(true);
  renderForm(form, handleCardFormSubmit);
}

const addButtonElement = document.querySelector('.profile__add');
addButtonElement.addEventListener('click', handleAddButtonClick);

const popupSlideTemplate = document.querySelector('#popup-slide');
function renderSlide(name, link) {
  const slide = popupSlideTemplate.content.cloneNode(true);

  const imageElement = slide.querySelector('.popup__slide-image');
  const titleElement = slide.querySelector('.popup__slide-title');

  imageElement.setAttribute('src', link);
  titleElement.textContent = name;

  renderElement(slide, popupSlideClass);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    const nameValue = evt.currentTarget.querySelector('.popup__input-text_type_profile-name').value;
    const jobValue = evt.currentTarget.querySelector('.popup__input-text_type_profile-rank').value;

    nameField.textContent = nameValue;
    jobField.textContent = jobValue;

    closeModal();
}
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const nameInput = evt.target.querySelector('.popup__input-text_type_card-name');
  const linkInput = evt.target.querySelector('.popup__input-text_type_card-image-url');

  const [name, link] = [nameInput, linkInput].map(inp => inp.value);

  renderCard({ name, link });

  closeModal();
}

function handleAddButtonClick () {
  renderElementForm();
  openModal();
}

function handleLikeClick(el) {
  el.classList.toggle('cards__like_active');
}

function handleImageLinkClick(evt, ...props) {
  evt.preventDefault();
  renderSlide(...props);
  openModal(true);
}

renderCards();
