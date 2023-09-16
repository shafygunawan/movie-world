import '../item/cast-item';

import Swiper, {
  Scrollbar,
} from 'swiper';

Swiper.use(Scrollbar);

class CastSlider extends HTMLElement {
  constructor() {
    super();
    this.casts = [];
    this.swiper = null;
  }

  connectedCallback() {
    this.render();
  }

  setCasts(casts) {
    this.casts = casts;
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
      .cast-slider__inner .swiper-slide {
        width: 9rem;
        margin-right: 1.5rem;
        height: 100%;
      }
    </style>`;

    this.innerHTML += `
    <div class="freemode-slider cast-slider__inner">
      <div class="freemode-slider__swiper">
        <div class="swiper-wrapper"></div>
        <div class="swiper-scrollbar"></div>
      </div>
    </div>`;

    this.init();
  }

  init() {
    this.casts.forEach((cast) => {
      this.addCast(cast);
    });
    this.loadSwiper();
  }

  addCast(cast) {
    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const castItemElement = document.createElement('cast-item');

    castItemElement.className = 'swiper-slide';
    castItemElement.setCast(cast);

    swiperWrapper.appendChild(castItemElement);
  }

  loadSwiper() {
    this.swiper = new Swiper('.cast-slider__inner .freemode-slider__swiper', {
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.cast-slider__inner .swiper-scrollbar',
        hide: false,
        draggable: true,
      },
    });
  }
}

customElements.define('cast-slider', CastSlider);
