const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const PERCENT_DIVIDER = 100;

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadedPicture = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = () => {
  uploadedPicture.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
  scaleValue.value = `${currentScale}%`;
};

const onSmallerScaleButtonClick = () => {
  currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
  changeScale();
};

const onBiggerScaleButtonClick = () => {
  currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
  changeScale();
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale();
};

const scalePicture = () => {
  smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);
};

export {scalePicture, resetScale};
