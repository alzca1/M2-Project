'use strict';

const main = () => {
  const form = document.querySelector('.playlist-form');
  const anchor = document.querySelector('.add-playlist');
  const playlistCollection = document.querySelector('.playlist-slider');
  const closeCreation = document.querySelector('.close-creation');

  // show playlist
  const showPlaylist = () => {
    const selectPlaylist = document.querySelectorAll('article button');
    selectPlaylist.forEach((button) => {
      button.addEventListener('click', async (event) => {
        console.log(event);
        try {
          const id = event.target.id;
          console.log(id);
          await axios.post(`/playlistSongCollection/${id}`);
          // await axios.post(`/api/recipes/${id}/delete`);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
  showPlaylist();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const playlist = {
      name: event.srcElement.name.value

    };
    const response = await axios.post('/api/playlist/', playlist);
    form.reset();
    const newPlaylist = response.data;
    console.log(response.data);

    if (response.data.message) {
      const errorMessage = document.querySelector('.playlist-collection');
      const p = document.createElement('p');
      p.innerText = response.data.message;
      errorMessage.appendChild(p);
      setTimeout(() => {
        errorMessage.removeChild(p);
      }, 3000);
    } else {
      const article = document.createElement('article');
      const button = document.createElement('button');

      article.setAttribute('class', 'cover-article');
      button.setAttribute('id', newPlaylist._id);
      const p = document.createElement('p');
      p.innerText = `${newPlaylist.name}`;
      article.appendChild(p);
      article.appendChild(button);
      playlistCollection.appendChild(article);
    }

    showPlaylist();
  });

  anchor.addEventListener('click', async (event) => {
    event.preventDefault();
    const section = document.querySelector('.playlist-collection');
    section.classList.toggle('visible');
  });

  closeCreation.addEventListener('click', async (event) => {
    event.preventDefault();
    const section = document.querySelector('.playlist-collection');
    section.classList.toggle('visible');
  });
};

window.addEventListener('load', main);
