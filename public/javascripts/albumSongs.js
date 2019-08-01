'use strict';

const mainSong = () => {
  const addView = document.querySelector('.add-to-playlists');
  const anchors = document.querySelectorAll('.add-button');
  const close = document.querySelector('.close-playlists');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', async (event) => {
      event.preventDefault();
      addView.classList.toggle('show-playlists');
    });
  });

  close.addEventListener('click', async (event) => {
    event.preventDefault();
    addView.classList.toggle('show-playlists');
  });
};

window.addEventListener('load', mainSong);
