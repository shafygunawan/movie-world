import '../item/regular-item';

import Swiper, { Autoplay } from 'swiper';

Swiper.use(Autoplay);

class RegularSlider extends HTMLElement {
  setMovies(movies) {
    this.movies = movies;
    this.render();
  }

  setItemClickedEvent(event) {
    const items = this.querySelectorAll('regular-item');
    items.forEach((item) => {
      item.addEventListener('click', () => event(item.dataset.movieId));
    });
  }

  render() {
    this.innerHTML = `
    <style>
      .regular-slider__inner {
        display: grid;
        grid-template: auto / 1fr 10fr 1fr;
        gap: 2rem;
      }
      
      .regular-slider__swiper {
        grid-column-start: 2;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .regular-slider__swiper .swiper-slide:hover {
        cursor: pointer;
      }
      
      @media only screen and (max-width: 1199px) {
        .regular-slider__inner {
          grid-template: auto / auto;
        }
      
        .regular-slider__swiper {
          grid-column-start: 1;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="regular-slider__inner container">
      <div class="regular-slider__swiper">
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
    const regularItemElement = document.createElement('regular-item');

    regularItemElement.setAttribute('data-movie-id', movie.id);
    regularItemElement.className = 'swiper-slide';
    regularItemElement.setMovie(movie);

    swiperWrapper.appendChild(regularItemElement);
  }

  loadSwiper() {
    this.swiper = new Swiper('.regular-slider__swiper', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 40,
      autoplay: {
        delay: 10000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },
    });
  }

  renderError(message) {
    this.innerHTML = `
    <style>
      .regular-slider__error {
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
    </style>`;

    this.innerHTML += `
    <article class="regular-slider__inner container">
      <p class="regular-slider__error">${message}</p>
    </article>`;
  }
}

customElements.define('regular-slider', RegularSlider);
