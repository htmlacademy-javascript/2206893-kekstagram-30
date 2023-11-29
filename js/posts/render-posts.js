import {getData} from '../data-server/api.js';
import {renderPostModal} from './render-modal.js';
import {renderGetErrorMessage} from '../utils/alert-messages.js';
import {debounce} from '../utils/util.js';
import {filterPosts} from './filters.js';

const GET_DATA_URL = 'https://30.javascript.pages.academy/kekstagram/data';

const container = document.querySelector('.pictures');
const filterContainer = document.querySelector('.img-filters');
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

let currentFilter = document.querySelector('.img-filters__button--active');

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

const debounceRender = debounce((filter, posts) => createPosts(filterPosts(filter, posts)));

const onFiltersClick = (evt, posts) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    currentFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target;
    debounceRender(currentFilter, posts);
  }
};

const renderPosts = (posts) => {
  createPosts(filterPosts(currentFilter, posts));
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', (evt) => onFiltersClick(evt, posts));
};

const InitRenderPosts = () => getData(GET_DATA_URL, renderPosts, showError);

export {InitRenderPosts};
