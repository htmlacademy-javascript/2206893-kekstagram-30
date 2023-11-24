import {validateForm, checkErrors, resetFormValidator} from './validate-form.js';
import {scalePicture, resetScale} from './scale-picture.js';
import {initSlider, onSelectEffectContainerChange} from './effect-picture.js';
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
};

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

function openFormModal () {
  imgUploadButton.addEventListener('change', onImgUploadButtonClick);
  selectEffectContainer.addEventListener('change', onSelectEffectContainerChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', (evt) => onSubmitForm(evt));
}

function closeFormModal () {
  uploadForm.reset();
  resetFormValidator();
  resetScale();

  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const renderForm = () => {
  openFormModal();
  scalePicture();
  initSlider(currentEffect);
  validateForm();
  checkErrors();
};

export {renderForm};
