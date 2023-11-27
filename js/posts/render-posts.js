import {getData} from '../data-server/api.js';
import {renderPostModal} from './render-modal.js';
import {renderGetErrorMessage} from '../utils/alert-messages.js';

const GET_DATA_URL = 'https://30.javascript.pages.academy/kekstagram/data';

const container = document.querySelector('.pictures');
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showError = () => renderGetErrorMessage(errorTemplate);

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();

const createPost = (data) => {
  const {url, description, likes, comments} = data;
  const post = template.cloneNode(true);
  const picture = post.querySelector('.picture__img');

  picture.src = url;
  picture.alt = description;
  post.querySelector('.picture__likes').textContent = likes;
  post.querySelector('.picture__comments').textContent = comments.length;

  post.addEventListener('click', () => renderPostModal(data));

  fragment.appendChild(post);
};

const createPosts = (posts) => {
  posts.forEach((post) => {
    createPost(post);
    container.appendChild(fragment);
  });
};


const renderPosts = () => getData(GET_DATA_URL, createPosts, showError);

export {renderPosts};
