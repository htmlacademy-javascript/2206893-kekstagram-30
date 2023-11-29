import {getShuffledArray} from '../utils/util.js';

const RANDOM_POSTS_COUNT = 10;

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const sortPosts = (posts) => posts.slice().sort((a, b) => b.comments.length - a.comments.length);

const shufflePosts = (posts) => getShuffledArray(posts.slice()).slice(0, RANDOM_POSTS_COUNT);

const clearPosts = () =>{
  const posts = document.querySelectorAll('.picture');
  posts.forEach((post) => post.remove());
};

const filterPosts = (filter, posts) => {
  clearPosts();
  switch(filter) {
    case discussedFilter:
      return sortPosts(posts);
    case randomFilter:
      return shufflePosts(posts);
    case defaultFilter:
      return posts;
  }
};

export {filterPosts};
