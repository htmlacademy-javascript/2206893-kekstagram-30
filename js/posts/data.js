import {getRandomInteger, getRandomArrayIndex, getRandomArrayElement} from '../utils/util.js';

const POSTS_COUNT = 25;
const LIKES_COUNT = {
  min: 15,
  max: 200
};
const COMMENTS_COUNT = {
  min: 0,
  max: 30
};
const SELECTED_AVATAR = {
  min: 1,
  max: 6
};
const NAMES = [
  'Иван',
  'Мария',
  'Кристина',
  'Виктор',
  'Юлия',
  'Людмила',
  'Владимир',
  'Анатолий',
  'Матвей'
];
const DESCRIPTION = [
  'Случайный кадр',
  'Просто красивое фото',
  'В отпуске',
  'Глаза б мои этого не видели'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let postId = 0;
let commentId = 0;

const generateMessage = () => {
  const message = Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(message)).join(' ');
};

const generateComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomArrayIndex(SELECTED_AVATAR)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

const generatePost = () => ({
  id: postId,
  url: `photos/${++postId}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomArrayIndex(LIKES_COUNT),
  comments: Array.from({length: getRandomArrayIndex(COMMENTS_COUNT)}, generateComment)
});

const generateArrayOfPosts = () => Array.from({length: POSTS_COUNT}, generatePost);

export {generateArrayOfPosts};
