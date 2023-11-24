import {validateForm, checkErrors, resetFormValidator} from './validate-form.js';
import {scalePicture, resetScale} from './scale-picture.js';
import {initSlider, onSelectEffectContainerChange, resetSlider} from './effect-picture.js';
import {isEscapeKey} from '../utils/util.js';

const imgUploadButton = document.querySelector('.img-upload__input');
const modalContainer = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const selectEffectContainer = document.querySelector('.img-upload__effects');
const currentEffect = document.querySelector('.effects__radio:checked');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeFormModal();
  }
};

const onCloseButtonClick = () => closeFormModal();

const onImgUploadButtonClick = () => {
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  openFormModal();
};

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

function openFormModal () {
  selectEffectContainer.addEventListener('change', onSelectEffectContainerChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onSubmitForm);
}

function closeFormModal () {
  uploadForm.reset();
  resetFormValidator();
  resetScale();
  resetSlider();

  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const renderForm = () => {
  scalePicture();
  checkErrors();
  validateForm();
  initSlider(currentEffect);
  imgUploadButton.addEventListener('change', onImgUploadButtonClick);
};

export {renderForm};
