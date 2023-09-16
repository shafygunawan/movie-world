import '../item/movie-item';

import Swiper from 'swiper';

class MovieSlider extends HTMLElement {
  constructor() {
    super();
    this.movies = [];
    this.swiper = null;
  }

  connectedCallback() {
    this.render();
  }

  setMovies(movies) {
    this.movies = movies;
    this.render();
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
      .movie-slider__inner .swiper-slide {
        width: 9rem;
        margin-right: 2.25rem;
      }

      .movie-slider__inner .swiper-wrapper>*{
        transition: transform .25s;
      }

      .movie-slider__inner .swiper-wrapper>*:hover {
        cursor: pointer;
        transform: scale(1.025);
      }
    </style>`;

    this.innerHTML += `
    <div class="freemode-slider movie-slider__inner">
      <div class="freemode-slider__swiper">
        <div class="swiper-wrapper"></div>
      </div>
    </div>`;

    this.init();
  }

  init() {
    this.movies.forEach((movie) => {
      this.addMovie(movie);
    });
    this.loadSwiper();
  }

  addMovie(movie) {
    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const movieItemElement = document.createElement('movie-item');

    movieItemElement.setAttribute('data-movie-id', movie.id);
    movieItemElement.className = 'swiper-slide';
    movieItemElement.setMovie(movie);

    swiperWrapper.appendChild(movieItemElement);
  }

  loadSwiper() {
    this.swiper = new Swiper('.movie-slider__inner .freemode-slider__swiper', {
      slidesPerView: 'auto',
      freeMode: true,
    });
  }

  renderError(message) {
    this.setMovies([]);

    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const errorELement = document.createElement('p');

    errorELement.className = 'movie-slider__error';
    errorELement.innerHTML = message;

    swiperWrapper.appendChild(errorELement);
  }
}

customElements.define('movie-slider', MovieSlider);
