import '../item/thumb-item';

import Swiper, {
  Navigation,
  Autoplay,
} from 'swiper';

Swiper.use([Navigation, Autoplay]);

class ThumbSlider extends HTMLElement {
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

  setSlideEvent(event) {
    this.swiper.on('slideNextTransitionEnd', event);
    this.swiper.on('slidePrevTransitionEnd', event);
    this.swiper.on('click', (swiper) => {
      swiper.slideTo(swiper.clickedIndex - 1);
      event();
    });
  }

  getActiveSlideId() {
    return this.querySelector('.swiper-slide-next').dataset.movieId;
  }

  render() {
    this.innerHTML = `
    <style>
      .thumb-slider__inner {
        position: relative;
      }
      
      .thumb-slider__swiper {
        width: 90%;
      }

      .thumb-slider__error {
        margin-inline: auto;
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
      
      .thumb-slider__swiper .swiper-slide {
        opacity: .5;
        transform: scale(.8);
        transition: opacity .25s, transform .25s;
      }
      
      .thumb-slider__swiper .swiper-slide:hover {
        cursor: pointer;
      }
      
      .thumb-slider__swiper .swiper-slide-next {
        opacity: 1;
        transform: none;
      }
      
      .thumb-slider__swiper .swiper-slide-next:hover {
        cursor: default;
      }
      
      .thumb-slider__control {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: .25rem;
        background-color: transparent;
        color: rgba(248, 249, 250, .125);
        border: none;
        cursor: pointer;
      }
      
      .thumb-slider__control_next {
        right: 1.5rem;
      }
      
      .thumb-slider__control_prev {
        left: 1.5rem;
      }
      
      .thumb-slider__control .material-icons-round {
        font-size: 2rem;
      }
      
      @media only screen and (max-width: 1199px) {
        .thumb-slider__swiper {
          width: 95%;
        }
      
        .thumb-slider__control_next {
          right: -1rem;
        }
      
        .thumb-slider__control_prev {
          left: -1rem;
        }
      }
      
      @media only screen and (max-width:767px) {
        .thumb-slider__swiper {
          width: 90%;
        }
      }
      
      @media only screen and (max-width:575px) {
        .thumb-slider__swiper {
          width: 60%;
        }
      
        .thumb-slider__swiper .swiper-slide {
          transform: none;
        }
      
        .thumb-slider__control_next {
          right: 1rem;
        }
      
        .thumb-slider__control_prev {
          left: 1rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="thumb-slider__inner container">
      <div class="swiper-container thumb-slider__swiper">
        <div class="swiper-wrapper"></div>
      </div>
      <button type="button" class="thumb-slider__control thumb-slider__control_next">
        <span class="material-icons-round">navigate_next</span>
      </button>
      <button type="button" class="thumb-slider__control thumb-slider__control_prev">
        <span class="material-icons-round">navigate_before</span>
      </button>
    </div>`;

    this.init();
  }

  init() {
    this.movies.forEach((movie) => {
      this.addMovie(movie);
    });
    this.loadSwiper();
    this.swiper.slidePrev();
  }

  addMovie(movie) {
    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const thumbItemElement = document.createElement('thumb-item');

    thumbItemElement.setAttribute('data-movie-id', movie.id);
    thumbItemElement.className = 'swiper-slide';
    thumbItemElement.setMovie(movie);

    swiperWrapper.appendChild(thumbItemElement);
  }

  loadSwiper() {
    this.swiper = new Swiper('.thumb-slider__swiper', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 32,
      navigation: {
        nextEl: '.thumb-slider__control_next',
        prevEl: '.thumb-slider__control_prev',
      },
      autoplay: {
        delay: 7500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      breakpoints: {
        1200: {
          slidesPerView: 9,
          spaceBetween: 12,
        },
        992: {
          slidesPerView: 8,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 12,
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  renderError(message) {
    this.setMovies([]);

    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const errorELement = document.createElement('p');

    errorELement.className = 'thumb-slider__error';
    errorELement.innerHTML = message;

    swiperWrapper.appendChild(errorELement);
  }
}

customElements.define('thumb-slider', ThumbSlider);
