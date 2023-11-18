import {generateArrayOfPosts} from './data.js';
import {renderPostModal} from './render-modal-post.js';
const container = document.querySelector('.pictures');

const template = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const posts = generateArrayOfPosts();
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

const renderPosts = () => {
  if (!container) {
    return;
  }

  posts.forEach((post) => {
    createPost(post);
    container.appendChild(fragment);
  });
};

export {renderPosts};
