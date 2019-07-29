'use strict';

const main = () => {
  const form = document.querySelector('.playlist-form');
  const playlistCollection = document.querySelector('.playlist-slider');

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

  // add recipe
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
      button.setAttribute('id', newPlaylist._id);
      button.innerText = 'go';
      const p = document.createElement('p');
      p.innerText = `${newPlaylist.name}`;
      article.appendChild(p);
      article.appendChild(button);
      playlistCollection.appendChild(article);
    }

    showPlaylist();
  });
};

window.addEventListener('load', main);
