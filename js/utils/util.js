const START_INDEX = 0;
const RENDER_DELAY = 500;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArrayIndex = (elements) => getRandomInteger(START_INDEX, elements.length - 1);

const isEscapeKey = (evt) => evt.key === 'Escape';

const getShuffledArray = (elements) => {
  let newElements = [];
  for (let i = elements.length - 1; i > 0; i--) {
    const j = getRandomArrayIndex(elements);
    newElements.push(elements[j]);
    elements.splice(j, 1);
  }
  newElements = newElements.concat(elements);

  return newElements;
};

const debounce = (callback, timeoutDelay = RENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getShuffledArray, isEscapeKey, debounce};
