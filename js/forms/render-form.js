import {validateForm, checkErrors, resetFormValidator} from './validate-form.js';
import {scalePicture, resetScale} from './scale-picture.js';
import {createSlider, changeEffect} from './effect-picture.js';
import {isEscapeKey} from '../utils/util.js';
import {renderMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/kekstagram/';

const imgUploadButton = document.querySelector('.img-upload__input');
const modalContainer = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const selectEffectContainer = document.querySelector('.img-upload__effects');
const currentEffect = document.querySelector('.effects__radio:checked');
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const successValue = 'success';
const errorValue = 'error';

const setSubmitButtonStatus = (value) => {
  uploadForm.disabled = value;
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
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  openFormModal();
};

function openFormModal () {
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

const renderForm = () => {
  validateForm();
  checkErrors();
  createSlider(currentEffect.value);
  scalePicture();
  imgUploadButton.addEventListener('change', onImgUploadButtonClick);
};

export {renderForm};
