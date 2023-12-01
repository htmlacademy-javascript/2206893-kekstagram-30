const RENDER_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getShuffledArray = (elements) => {
  let newElements = [];
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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

export {getShuffledArray, isEscapeKey, debounce};
