import '../item/movie-item';

class MovieList extends HTMLElement {
  constructor() {
    super();
    this.movies = [];
  }

  connectedCallback() {
    this.render();
  }

  setMovies(movies) {
    this.movies = movies;
    this.render();
  }

  setMoreMovies(movies) {
    movies.forEach((movie) => {
      this.addMovie(movie);
    });
  }

  setLoadMoreEvent(event) {
    this.querySelector('.movie-list__load-button').addEventListener('click', event);
  }

  setItemClickedEvent(event) {
    const items = this.querySelectorAll('movie-item');
    items.forEach((item) => {
      item.addEventListener('click', () => event(item.dataset.movieId));
    });
  }

  render() {
    this.innerHTML = `
    <style>
      .movie-list__inner {
        display: grid;
        grid-auto-flow: row;
        gap: 6rem;
      }
      
      .movie-list__wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        gap: 2.75rem;
      }

      .movie-list__error {
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
      
      .movie-list__wrapper>movie-item {
        flex-basis: calc(100% / 6 - 2.75rem);
        transition: transform .25s;
      }
      
      .movie-list__wrapper>movie-item:hover {
        cursor: pointer;
        transform: scale(1.025);
      }
      
      .movie-list__load-button {
        display: block;
        margin-inline: auto;
        padding: .75rem 3.5rem;
        border-radius: 9999rem;
      }
      
      @media only screen and (max-width: 1199px) {
        .movie-list__wrapper>movie-item {
          flex-basis: calc(100% / 5 - 2.75rem);
        }
      }
      
      @media only screen and (max-width: 991px) {
        .movie-list__wrapper>movie-item {
          flex-basis: calc(100% / 4 - 2.75rem);
        }
      }
      
      @media only screen and (max-width: 767px) {
        .movie-list__wrapper>movie-item {
          flex-basis: calc(100% / 3 - 2.75rem);
        }
      
        .movie-list__inner {
          gap: 5rem;
        }
      }
      
      @media only screen and (max-width: 575px) {
        .movie-list__wrapper>movie-item {
          flex-basis: calc(100% / 2 - 2.75rem);
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="movie-list__inner container">
      <div class="movie-list__wrapper"></div>
    </div>`;

    this.init();
  }

  init() {
    this.movies.forEach((movie) => {
      this.addMovie(movie);
    });
  }

  addMovie(movie) {
    const movieList = this.querySelector('.movie-list__wrapper');
    const movieItemElement = document.createElement('movie-item');

    movieItemElement.setAttribute('data-movie-id', movie.id);
    movieItemElement.setMovie(movie);
    movieList.appendChild(movieItemElement);
  }

  addLoadMoreButton() {
    const movieList = this.querySelector('.movie-list__inner');
    const loadButtonElement = document.createElement('button');

    loadButtonElement.className = 'movie-list__load-button button';
    loadButtonElement.innerHTML = '<span class="button__body">Discover More</span>';

    movieList.appendChild(loadButtonElement);
  }

  removeLoadMoreButton() {
    this.querySelector('.movie-list__load-button').remove();
  }

  renderError(message) {
    this.setMovies([]);

    const wrapper = this.querySelector('.movie-list__wrapper');
    const errorELement = document.createElement('p');

    errorELement.className = 'movie-list__error';
    errorELement.innerHTML = message;

    wrapper.appendChild(errorELement);
  }

  loadMoreRenderError(message) {
    const movieList = this.querySelector('.movie-list__inner');
    const errorELement = document.createElement('p');

    errorELement.className = 'movie-list__error';
    errorELement.innerHTML = message;

    movieList.appendChild(errorELement);
  }
}

customElements.define('movie-list', MovieList);
