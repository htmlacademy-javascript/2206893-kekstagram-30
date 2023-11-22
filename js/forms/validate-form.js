const HASHTAGS_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_INVALID_HASHTAG = 'введён невалидный хэш-тег';
const ERROR_NUMBER_HASHTAGS = 'превышено количество хэш-тегов';
const ERROR_REPEAT_HASHTAGS = 'хэш-теги повторяются';
const ERROR_COMMENTS_LENGTH = `длина комментария больше ${COMMENT_MAX_LENGTH} символов`;

const uploadForm = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

let hashtagsArray = [];

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtag = () => {
  hashtagsArray = hashtags.value.trim().replaceAll(/ +/g, ' ').toLowerCase().split(' ');
  return hashtagsArray.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
};

const validateHashtagNumber = () => hashtagsArray.length <= HASHTAGS_MAX_COUNT;

const validateHashtagRepeat = () => new Set(hashtagsArray).size === hashtagsArray.length;

const validateComment = () => comment.textContent.length <= COMMENT_MAX_LENGTH;

function getErrorMessage () {
  pristine.addValidator(hashtags, validateHashtag, ERROR_INVALID_HASHTAG, 1, true);
  pristine.addValidator(hashtags, validateHashtagNumber, ERROR_NUMBER_HASHTAGS, 1, true);
  pristine.addValidator(hashtags, validateHashtagRepeat, ERROR_REPEAT_HASHTAGS, 1, true);
  pristine.addValidator(comment, validateComment, ERROR_COMMENTS_LENGTH, 1, true);
}

const validateForm = () => pristine.validate();

const resetFormValidator = () => pristine.reset();

export {validateForm, getErrorMessage, resetFormValidator};