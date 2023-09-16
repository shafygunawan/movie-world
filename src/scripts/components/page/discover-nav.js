import '@chenfengyuan/datepicker/dist/datepicker.esm';

import $ from 'jquery';
import Swiper, {
  Navigation,
} from 'swiper';

Swiper.use(Navigation);

class DiscoverNav extends HTMLElement {
  constructor() {
    super();
    this.menus = [];
    this.swiper = null;
  }

  connectedCallback() {
    this.render();
  }

  setMenus(menus) {
    this.menus = menus;
    this.render();
  }

  setFilterEvent(event) {
    this.querySelector('.discover-menu__sort').addEventListener('change', event);
    this.querySelectorAll('.menu__link').forEach((menuLink) => {
      menuLink.addEventListener('click', event);
    });
    $(this).find('[data-toggle="datepicker"]').on('pick.datepicker', event);
  }

  getFilterOptions() {
    return {
      sortBy: this.querySelector('.discover-menu__sort').value,
      genreIds: this.querySelector('.menu__link_active').id,
      releaseYear: $(this).find('[data-toggle="datepicker"]').datepicker('getDate', true),
    };
  }

  render() {
    this.innerHTML = `
    <style>
      .discover-menu__inner {
        display: grid;
        grid-template: auto / auto 1fr auto;
        align-items: center;
        gap: 2rem;
      }
      
      .discover-menu__select {
        width: fit-content;
        padding: .625rem 2.75rem .625rem 1.5rem;
        font-family: inherit;
        font-size: .875rem;
        background-color: rgba(248, 249, 250, .125);
        color: var(--white);
        border: none;
        border-radius: 9999rem;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23f8f9fabf' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 16px 12px;
        appearance: none;
        cursor: pointer;
      }
      
      .discover-menu__sort:focus {
        color: initial;
      }
      
      .discover-menu__freemode-slider {
        padding-inline: 1rem;
      }
      
      .discover-menu__freemode-slider .swiper-slide {
        width: max-content;
        margin-right: 1.5rem;
      }

      .swiper-button-disabled {
        pointer-events: none;
        color: transparent;
      }
      
      .discover-menu__filter {
        position: relative;
      }
      
      .discover-menu__filter .datepicker {
        width: 8rem;
        -moz-appearance: textfield;
      }
      
      .discover-menu__filter .datepicker::placeholder {
        color: var(--white);
      }

      .discover-menu__filter .datepicker::-webkit-outer-spin-button,
      .discover-menu__filter .datepicker::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .discover-menu__filter .datepicker-container {
        position: absolute;
        top: 120%;
        left: unset;
        right: 0;
        background-color: var(--black);
        color: var(--white);
        border: solid 1px rgba(248, 249, 250, .125);
        z-index: 1000;
      }

      .discover-menu__filter .datepicker-panel>ul>li,
      .discover-menu__filter .datepicker-panel>ul>li.disabled,
      .discover-menu__filter .datepicker-panel>ul>li.disabled:hover,
      .discover-menu__filter .datepicker-panel>ul>li.highlighted {
        background-color: transparent;
      }

      .discover-menu__filter .datepicker-panel>ul>li:hover {
        background-color: rgba(248, 249, 250, .125);
        color: var(--white);
      }

      .discover-menu__filter .datepicker-panel>ul>li.picked,
      .discover-menu__filter .datepicker-panel>ul>li.picked:hover {
        background-color: rgba(248, 249, 250, .125);
        color: var(--primary);
      }
      
      @media only screen and (max-width: 767px) {
        .discover-menu__inner {
          grid-template: repeat(2, auto) / repeat(2, auto);
          justify-content: space-between;
          gap: 1rem;
        }
      
        .discover-menu__freemode-slider {
          order: 1;
          grid-column-end: span 2;
        }
      
        .discover-menu__filter {
          margin-left: auto;
        }
      }
      
      @media only screen and (max-width:575px) {
        .discover-menu__inner {
          gap: .5rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="discover-menu__inner container">
      <select name="" id="" class="discover-menu__sort discover-menu__select">
        <option value="popularity.desc" selected>Popular</option>
        <option value="vote_average.desc">Hight Rates</option>
      </select>
      <div class="discover-menu__freemode-slider freemode-slider">
        <div class="freemode-slider__swiper">
          <div class="swiper-wrapper menu">
            <button type="menu" class="swiper-slide menu__link menu__link_size_sm menu__link_active" id="">
              All
            </button>
          </div>
        </div>
        <button class="freemode-slider__control freemode-slider__control_prev">
          <span class="material-icons-round">navigate_before</span>
        </button>
        <button class="freemode-slider__control freemode-slider__control_next">
          <span class="material-icons-round">navigate_next</span>
        </button>
      </div>
      <div class="discover-menu__filter">
        <input type="number" data-toggle="datepicker" class="discover-menu__select datepicker" placeholder="Year">
      </div>
    </div>`;

    this.init();
  }

  init() {
    const selectYearContainer = this.querySelector('.discover-menu__filter');
    const selectYear = $(this).find('[data-toggle="datepicker"]');

    this.resetMenu();
    this.menus.forEach((menu) => {
      this.addMenu(menu);
    });

    this.loadSwiper();

    selectYear.datepicker({
      inline: true,
      container: selectYearContainer,
      format: 'yyyy',
    });
    selectYear.datepicker('pick');
    selectYear.datepicker('hide');
    selectYearContainer.addEventListener('click', (event) => {
      selectYear.datepicker('show');
      event.stopPropagation();
    });
    window.addEventListener('click', () => selectYear.datepicker('hide'));
    $('[data-toggle="datepicker"]').on('pick.datepicker', () => {
      selectYear.datepicker('hide');
    });
  }

  addMenu({ id = '', name = '' }) {
    const menu = this.querySelector('.menu');
    const menuLinkElement = document.createElement('button');

    menuLinkElement.type = 'menu';
    menuLinkElement.id = id;
    menuLinkElement.className = 'swiper-slide menu__link menu__link_size_sm';
    menuLinkElement.innerHTML = name;
    menuLinkElement.addEventListener('click', (event) => this.switchMenu(event.currentTarget));

    menu.appendChild(menuLinkElement);
  }

  resetMenu() {
    const menu = this.querySelector('.menu');
    menu.innerHTML = '';

    this.addMenu({ name: 'All' });
    this.querySelector('.menu__link').classList.add('menu__link_active');
  }

  switchMenu(newMenuActive) {
    const menuActive = this.querySelector('.menu__link_active');
    menuActive.classList.remove('menu__link_active');
    newMenuActive.classList.add('menu__link_active');
  }

  loadSwiper() {
    this.swiper = new Swiper('.discover-menu__freemode-slider .freemode-slider__swiper', {
      slidesPerView: 'auto',
      freeMode: true,
      navigation: {
        nextEl: '.discover-menu__freemode-slider .freemode-slider__control_next',
        prevEl: '.discover-menu__freemode-slider .freemode-slider__control_prev',
      },
    });

    const menuLink = this.querySelector('.menu__link');
    const menuLinkMarginRight = getComputedStyle(menuLink).marginRight;
    const swiperWrapper = this.querySelector('.swiper-wrapper');
    const swiperSlides = this.querySelectorAll('.swiper-slide');
    let swiperSlidesWidth = 0;

    for (let i = 0; i < swiperSlides.length; i++) {
      const isLastSwiperSlide = i === swiperSlides.length - 1;
      if (isLastSwiperSlide) {
        swiperSlidesWidth += swiperSlides[i].offsetWidth;
      } else {
        swiperSlidesWidth += swiperSlides[i].offsetWidth + menuLinkMarginRight;
      }
    }
    if (swiperWrapper.clientWidth > swiperSlidesWidth) {
      swiperWrapper.style.justifyContent = 'center';
    }
  }
}

customElements.define('discover-nav', DiscoverNav);
