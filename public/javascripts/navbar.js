'use strict';

const main = () => {
  const searchView = document.querySelector('.search-hidden-navbar');
  const anchor = document.querySelector('.big-icon');
  const close = document.querySelector('.close-search');

  anchor.addEventListener('click', async (event) => {
    event.preventDefault();
    searchView.classList.toggle('show-search');
  });

  close.addEventListener('click', async (event) => {
    event.preventDefault();
    searchView.classList.toggle('show-search');
  });
};

window.addEventListener('load', main);
