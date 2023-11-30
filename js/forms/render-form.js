import {validateForm, checkErrors, resetFormValidator} from './validate-form.js';
import {scalePicture, resetScale} from './scale-picture.js';
import {initSlider, changeEffect} from './effect-picture.js';
import {isEscapeKey} from '../utils/util.js';
import {renderMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/kekstagram/';
const FILE_TYPES = ['.jpg', '.jpeg', 'png', '.gif', '.webp', '.svg'];
const ERROR_MESSAGE = 'Неверный формат изображения!';
const FIRST_ELEMENT_INDEX = 0;

const imgUploadButton = document.querySelector('.img-upload__input');
const modalContainer = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFormButton = document.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');
const selectEffectContainer = document.querySelector('.img-upload__effects');
const currentEffect = document.querySelector('.effects__radio:checked');
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const previewFull = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');
const successValue = 'success';
const errorValue = 'error';

const setSubmitButtonStatus = (value) => {
  uploadFormButton.disabled = value;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description') && !document.querySelector('.error')) {
    evt.preventDefault();
    closeFormModal();
  }
};

const onSelectEffectContainerChange = (evt) => changeEffect(evt.target.value);

const onCloseButtonClick = () => closeFormModal();

const showSuccess = () => {
  closeFormModal();

  document.body.classList.add('modal-open');

  renderMessage(sendSuccessTemplate, successValue);
  setSubmitButtonStatus(false);
};

const showError = () => {
  renderMessage(sendErrorTemplate, errorValue);
  setSubmitButtonStatus(false);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    setSubmitButtonStatus(true);
    sendData(POST_DATA_URL, showSuccess, showError, new FormData(evt.target));
  }
};

const onImgUploadButtonClick = () => {
  const file = imgUploadButton.files[FIRST_ELEMENT_INDEX];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    previewFull.src = src;
    previewEffects.forEach((previewEffect) => {
      previewEffect.style.backgroundImage = `url(${src})`;
    });
    openFormModal();
  } else {
    renderMessage(sendErrorTemplate, errorValue);
    document.querySelector('.error__title').textContent = ERROR_MESSAGE;
  }
};

function openFormModal () {
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  validateForm();
  checkErrors();
  initSlider(currentEffect.value);
  scalePicture();

  selectEffectContainer.addEventListener('change', onSelectEffectContainerChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onSubmitForm);
}

function closeFormModal () {
  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('submit', onSubmitForm);

  uploadForm.reset();
  resetFormValidator();
  resetScale();
  changeEffect(currentEffect.value);
}

const renderForm = () => imgUploadButton.addEventListener('change', onImgUploadButtonClick);

export {renderForm};
