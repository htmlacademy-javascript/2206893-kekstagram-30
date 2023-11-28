import {isEscapeKey} from '../utils/util.js';

const ALERT_SHOW_TIME = 5000;

let template;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeMessage();
  }
};

const createTemplate = (item) => {
  template = item.cloneNode(true);
  document.body.append(template);
};

const renderGetErrorMessage = (item) => {
  createTemplate(item);

  setTimeout(() => {
    template.remove();
  }, ALERT_SHOW_TIME);
};

function closeMessage () {
  template.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

function onCloseButtonClick () {
  closeMessage();
}

const renderMessage = (item, value) => {
  createTemplate(item);

  template.querySelector(`.${value}__button`).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', (evt) => onBodyClick(evt, value));
  document.body.classList.add('modal-open');
};


function onBodyClick(evt, value) {
  if (evt.target.closest(`.${value}__inner`)) {
    return;
  }
  closeMessage();
}

export {renderMessage, renderGetErrorMessage};
