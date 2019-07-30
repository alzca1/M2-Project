'use strict';

const main = () => {
  const collectionForm = document.querySelector('.playlist-scrolldown-form');
  const playlistCollectionScrolldown = document.querySelector('.playlist-scrolldown-collection');
  // show playlist
  const showPlaylist = () => {
    const selectPlaylist = document.querySelectorAll('article button');
    selectPlaylist.forEach((button) => {
      button.addEventListener('click', async (event) => {
        console.log(event);
        try {
          const id = event.target.id;
          console.log(id);
          await axios.post(`/playlistCollection/${id}`);
          // await axios.post(`/api/recipes/${id}/delete`);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
  showPlaylist();

  // add playlist in playlistCollection
  collectionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const playlist = {
      name: event.srcElement.name.value

    };
    const response = await axios.post('/api/playlistCollection/', playlist);
    collectionForm.reset();
    const newPlaylist = response.data;
    console.log(response.data);

    if (response.data.message) {
      const errorMessage = document.querySelector('.playlist-scrolldown-collection');
      const p = document.createElement('p');
      p.innerText = response.data.message;
      errorMessage.appendChild(p);
      setTimeout(() => {
        errorMessage.removeChild(p);
      }, 3000);
    } else {
      const article = document.createElement('article');
      const buttonCreate = document.createElement('button');
      const buttonDelete = document.createElement('button');
      buttonCreate.setAttribute('id', newPlaylist._id);
      buttonDelete.setAttribute('id', newPlaylist._id);
      buttonCreate.innerText = 'go';
      buttonCreate.innerText = 'delete';
      const p = document.createElement('p');
      p.innerText = `${newPlaylist.name}`;
      article.appendChild(p);
      article.appendChild(buttonCreate);
      article.appendChild(buttonDelete);
      playlistCollectionScrolldown.appendChild(article);
    }

    showPlaylist();
  });
};

window.addEventListener('load', main);
