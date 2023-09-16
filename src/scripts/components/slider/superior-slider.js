import Swiper, {
  Pagination,
  Autoplay,
} from 'swiper';
import CONFIG from '../../global/config';

Swiper.use([Pagination, Autoplay]);

class SuperiorSlider extends HTMLElement {
  setMovies(movies) {
    this.movies = movies;
    this.render();
  }

  setDetailClickedEvent(event) {
    this.onDetailClicked = event;
    this.updateSummary();
  }

  render() {
    this.innerHTML = `
    <style>
      .superior-slider__image {
        display: block;
        width: 100%;
        border-radius: .25rem;
      }
      
      .superior-slider__inner {
        display: grid;
        grid-template: auto / 1fr 5fr 5fr 1fr;
        gap: 2rem;
      }
      
      .superior-slider__swiper {
        grid-column-start: 2;
        position: relative;
        width: 100%;
        height: fit-content;
        overflow: hidden;
      }
      
      .superior-slider__image {
        display: block;
        width: 100%;
        height: fit-content;
      }
      
      .superior-slider__swiper .swiper-pagination-bullet-active {
        background-color: var(--primary);
      }

      .superior-summary__title {
        font-size: 2rem;
        font-weight: 600;
        color: var(--primary);
      }
      
      .superior-summary__overview {
        margin-top: 1rem;
        line-height: 1.75;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      
      .superior-summary__release {
        margin-top: 1.5rem;
        font-size: .875rem;
      }
      
      .superior-summary__action-button {
        display: block;
        margin-top: 1.5rem;
        padding: .75rem;
        font-family: inherit;
        font-size: .75rem;
        background-color: transparent;
        color: inherit;
        border: none;
        border-bottom: 3px solid var(--dark-primary);
        cursor: pointer;
      }
      
      @media only screen and (max-width: 1199px) {
        .superior-slider__inner {
          grid-template: auto / repeat(2, 1fr);
        }
      
        .superior-slider__swiper {
          grid-column-start: 1;
        }
      }
      
      @media only screen and (max-width: 991px) {
        .superior-summary__overview {
          margin-top: .75rem;
          line-height: 1.5;
        }
      }
      
      @media only screen and (max-width:767px) {
        .superior-slider__inner {
          grid-template: repeat(2, auto) / auto;
        }
        
        .superior-summary__title {
          font-size: 1.75rem;
        }
      }
      
      @media only screen and (max-width:575px) {
        .superior-slider__inner {
          gap: 1.75rem;
        }
        
        .superior-summary__title {
          font-size: 1.5rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="superior-slider__inner container">
      <div class="superior-slider__swiper swiper">
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="superior-summary"></div>
    </div>`;

    this.init();
  }

  init() {
    this.movies.forEach((movie) => {
      movie.backdrop_path = movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : './images/backdrop-not-available.png';
      this.addMovie(movie);
    });
    this.loadSwiper();
    this.updateSummary();
  }

  addMovie(movie) {
    const movieImageElement = document.createElement('img');

    movieImageElement.setAttribute('src', movie.backdrop_path);
    movieImageElement.setAttribute('data-movie-id', movie.id);
    movieImageElement.setAttribute('loading', 'lazy');
    movieImageElement.className = 'swiper-slide superior-slider__image';

    this.querySelector('.swiper-wrapper').appendChild(movieImageElement);
  }

  updateSummary() {
    const summary = this.querySelector('.superior-summary');
    const activeSlideId = this.querySelector('.swiper-slide-active').dataset.movieId;
    const activeSlide = this.movies.find((movie) => movie.id.toString() === activeSlideId);

    summary.innerHTML = `
    <h3 class="superior-summary__title">${activeSlide.title || activeSlide.name}</h3>
    <p class="superior-summary__overview">
      ${activeSlide.overview}
    </p>
    <p class="superior-summary__release">
      ${(activeSlide.release_date) ? `Release Date : ${activeSlide.release_date}` : `First Air Date : ${activeSlide.first_air_date}`}
    </p>
    <button type="button" class="superior-summary__action-button">See Detail</button>`;

    if (this.onDetailClicked) {
      const detailButton = summary.querySelector('.superior-summary__action-button');
      detailButton.addEventListener('click', () => this.onDetailClicked(activeSlideId));
    }
  }

  loadSwiper() {
    this.swiper = new Swiper('.superior-slider__swiper', {
      loop: true,
      pagination: {
        el: '.superior-slider__swiper .swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });

    this.swiper.on('slideNextTransitionEnd', () => this.updateSummary());
    this.swiper.on('slidePrevTransitionEnd', () => this.updateSummary());
  }

  renderError(message) {
    this.innerHTML = `
    <style>
      .superior-slider__error {
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
    </style>`;

    this.innerHTML += `
    <article class="superior-slider__inner container">
      <p class="superior-slider__error">${message}</p>
    </article>`;
  }
}

customElements.define('superior-slider', SuperiorSlider);
