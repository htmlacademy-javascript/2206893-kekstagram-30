import {getData} from '../data-server/api.js';
import {renderPostModal} from './render-modal.js';
import {renderGetErrorMessage} from '../utils/alert-messages.js';
import {debounce} from '../utils/util.js';
import {sortPosts} from './sorting.js';

const GET_DATA_URL = 'https://30.javascript.pages.academy/kekstagram/data';

const container = document.querySelector('.pictures');
const sortingContainer = document.querySelector('.img-filters');
const errorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const fragment = document.createDocumentFragment();

let currentSorting = document.querySelector('.img-filters__button--active');

const showError = () => renderGetErrorMessage(errorTemplate);

const createPost = (data) => {
  const {url, description, likes, comments} = data;
  const post = template.cloneNode(true);
  const img = post.querySelector('.picture__img');

  img.src = url;
  img.alt = description;
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

const debounceRender = debounce((sorting, posts) => createPosts(sortPosts(sorting, posts)));

const onSortingClick = (evt, posts) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    currentSorting.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentSorting = evt.target.closest('.img-filters__button');
    debounceRender(currentSorting, posts);
  }
};

const renderPosts = (posts) => {
  createPosts(sortPosts(currentSorting, posts));
  sortingContainer.classList.remove('img-filters--inactive');
  sortingContainer.addEventListener('click', (evt) => onSortingClick(evt, posts));
};

const initRenderPosts = () => getData(GET_DATA_URL, renderPosts, showError);

export {initRenderPosts};
