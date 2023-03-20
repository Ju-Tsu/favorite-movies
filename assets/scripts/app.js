const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.getElementById('add_movie_button');
const showBackdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const toggleBackdrop = () => {
  showBackdrop.classList.toggle('visible');
}
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};
const deleteMovie = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  // confirmDeletionBtn.removeEventListener('click', deleteMovie.bind(null, movieId)); //will not work :c

  cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal )
  cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionBtn.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
  );
};
const enterNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};
function showMovieModal() {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
}

const clearMovieInput = () => {
  // userInputs[0].value = ''; // чистит один конкретный инпут
  for (const usrInput of userInputs) {
    usrInput.value = '';   //чистит все инпуты
  }
};

const cancelAddMovieBtn = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (titleValue.trim() === '' ||
      imageValue.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1 ||
      +ratingValue > 5
  ) {
    alert('Please, enter valid values (rating between 1 and 5)');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  enterNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};
const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
}

startAddMovieButton.addEventListener('click', showMovieModal);
showBackdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieBtn);
confirmAddMovieButton.addEventListener('click', addMovieHandler);



// function closeModal() {
//   if (modal) {
//     modal.classList.remove('open');
//   }
//   showBackdrop.classList.remove('open');
//   setTimeout(function() {
//     showBackdrop.style.display = "none";
//   }, 200);
// }
