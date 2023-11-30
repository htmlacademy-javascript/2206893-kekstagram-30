import {getShuffledArray} from '../utils/util.js';

const RANDOM_POSTS_COUNT = 10;

const defaultSorting = document.querySelector('#filter-default');
const randomSorting = document.querySelector('#filter-random');
const discussedSorting = document.querySelector('#filter-discussed');

const mostDiscussedPosts = (posts) => posts.slice().sort((a, b) => b.comments.length - a.comments.length);

const shufflePosts = (posts) => getShuffledArray(posts.slice()).slice(0, RANDOM_POSTS_COUNT);

const clearPosts = () =>{
  const posts = document.querySelectorAll('.picture');
  posts.forEach((post) => post.remove());
};

const sortPosts = (sorting, posts) => {
  clearPosts();
  switch(sorting) {
    case discussedSorting:
      return mostDiscussedPosts(posts);
    case randomSorting:
      return shufflePosts(posts);
    case defaultSorting:
      return posts;
  }
};

export {sortPosts};
