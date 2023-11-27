const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const effectControl = document.querySelector('.img-upload__effect-level');
const uploadedPicture = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');

const setCurrentEffect = (value) => EFFECTS[value] || EFFECTS.none;

const updateSlider = (effect) => {
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    sliderElement.value = +effectValue.value;
    uploadedPicture.style.filter = (effect === EFFECTS.none) ? null : `${effect.name}(${effectValue.value}${effect.unit})`;
  });
};

const setSliderStatus = (effect) => effectControl.classList.toggle('hidden', effect === EFFECTS.none);

const createSlider = (effect) => {
  const currentEffect = setCurrentEffect(effect);

  setSliderStatus(effect);

  noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower'
  });

  updateSlider(currentEffect);
};

const changeEffect = (effect) => {
  const currentEffect = setCurrentEffect(effect);

  setSliderStatus(effect);

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step
  });

  updateSlider(currentEffect);
};

export {createSlider, changeEffect};
