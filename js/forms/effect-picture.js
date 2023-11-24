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

const createSlider = (element) => {
  if (!EFFECTS[element.value]) {
    element.value = 'none';
  }

  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[element.value].min,
      max: EFFECTS[element.value].max,
    },
    start: EFFECTS[element.value].max,
    step: EFFECTS[element.value].step,
    connect: 'lower'
  });

  console.log(EFFECTS[element.value].min, EFFECTS[element.value].max, EFFECTS[element.value].step, EFFECTS[element.value].unit);
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    uploadedPicture.style.filter = `${EFFECTS[element.value].name}(${effectValue.value}${EFFECTS[element.value].unit})`;
  });
};

const changeEffect = (element) => {
  let currentEffect = element.value;

  if (!EFFECTS[currentEffect]) {
    currentEffect = 'none';
  }
  console.log(EFFECTS[currentEffect].min, EFFECTS[currentEffect].max, EFFECTS[currentEffect].step, EFFECTS[currentEffect].unit);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[currentEffect].min,
      max: EFFECTS[currentEffect].max,
    },
    start: EFFECTS[currentEffect].max,
    step: EFFECTS[currentEffect].step
  });

  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    uploadedPicture.style.filter = `${EFFECTS[currentEffect].name}(${effectValue.value}${EFFECTS[currentEffect].unit})`;
  });
};

const setEffectControlAvailability = (effect) => {
  if (effect.value === 'none') {
    effectControl.classList.add('hidden');
    uploadedPicture.style.filter = '';
    return;
  }

  effectControl.classList.remove('hidden');
};

const initSlider = (effect) => {
  if (!sliderElement.noUiSlider) {
    createSlider(effect);
  }

  setEffectControlAvailability(effect);
  changeEffect(effect);
};

const onSelectEffectContainerChange = (evt) => {
  setEffectControlAvailability(evt.target);
  changeEffect(evt.target);
};

function resetSlider () {
  uploadedPicture.style.filter = '';
  effectControl.classList.add('hidden');
}

export {initSlider, onSelectEffectContainerChange, resetSlider};
