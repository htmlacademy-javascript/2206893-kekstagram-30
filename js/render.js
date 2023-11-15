import {generateArrayOfPosts} from './data.js';

const renderPosts = () => {
  const container = document.querySelector('.pictures');
  if (!container) {
    return;
  }

  const template = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const posts = generateArrayOfPosts();
  const fragment = document.createDocumentFragment();

  posts.forEach((data) => {
    const {url, description, likes, comments} = data;
    const post = template.cloneNode(true);
    const picture = post.querySelector('.picture__img');

    picture.src = url;
    picture.alt = description;
    post.querySelector('.picture__likes').textContent = likes;
    post.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(post);
  });

  container.appendChild(fragment);
};

export {renderPosts};
