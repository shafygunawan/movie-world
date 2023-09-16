import '../slider/cast-slider';
import '../slider/movie-slider';

import CONFIG from '../../global/config';

class DetailMovie extends HTMLElement {
  setMovie(movie) {
    movie.backdrop_path = movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : './images/backdrop-not-available.png';
    movie.poster_path = movie.poster_path ? CONFIG.BASE_IMAGE_URL + movie.poster_path : './images/poster-not-available.png';

    const trailers = [];
    movie.videos.results.forEach((trailer) => {
      const isTrailer = trailer.type.toLowerCase() === 'clip' || trailer.type.toLowerCase() === 'trailer';
      if (trailer.site.toLowerCase() === 'youtube' && isTrailer) {
        trailers.push(trailer);
      }
    });

    movie.trailer = trailers.length ? trailers[0] : null;

    this.movie = movie;
    this.render();
  }

  getCastSliderElement() {
    return this.querySelector('cast-slider');
  }

  getSimilarSliderElement() {
    return this.querySelector('.similar movie-slider');
  }

  getRecommendationsSliderElement() {
    return this.querySelector('.recommendations movie-slider');
  }

  render() {
    this.innerHTML = `
    <style>
      cast-slider,
      movie-slider{
        overflow: hidden;
      }

      .detail-movie__inner{
        position: relative;
        top: 100vh;
        background-color: var(--black);
        transition: top .25s;
      }
      
      .detail-movie__inner_show{
        top: 0;
      }

      .detail-movie__header {
        padding-block: 0.75rem;
        background-color: var(--black);
        color: rgba(248, 249, 250, 0.5);
        border-bottom: 1px solid rgba(248, 249, 250, 0.125);
        z-index: 1010;
      }
      
      .detail-movie__close-button {
        display: flex;
        align-items: center;
        margin-left: auto;
        padding: .5rem;
        background-color: transparent;
        color: inherit;
        border: none;
        cursor: pointer;
      }
      
      .detail-movie__body {
        display: grid;
        grid-auto-flow: row;
        gap: 5rem;
        padding-top: 3rem;
        padding-bottom: 6rem;
      }
      
      .detail-movie__main {
        display: grid;
        grid-auto-flow: row;
        gap: 4rem;
        padding-bottom: 2.5rem;
      }
      
      .detail-movie__backdrop {
        z-index: 0;
      }
      
      .detail-movie__overlay {
        background-image: linear-gradient(to bottom, transparent, var(--black));
      }
      
      .detail-movie__image {
        position: relative;
        display: block;
        width: 100%;
        border: 1px solid var(--black);
        border-radius: .25rem;
        z-index: -1;
      }
      
      .detail-movie__wrapper {
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
        gap: 2rem;
        margin-top: -12rem;
        z-index: 1;
      }
      
      .detail-movie__poster {
        display: block;
        width: 100%;
        border-radius: .25rem;
      }
      
      .detail-movie__release {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        color: rgba(248, 249, 250, 0.625);
      }
      
      .detail-movie__title {
        font-size: 1.75rem;
        font-weight: 600;
      }
      
      .detail-movie__tagline {
        margin-top: 0.25rem;
        font-style: italic;
        color: rgba(248, 249, 250, 0.75);
      }
      
      .detail-movie__rate {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 1rem;
      }
      
      .detail-movie__rate .material-icons-round {
        font-size: 1.25rem;
        color: var(--yellow);
      }
      
      .detail-movie__rate span:last-child {
        margin-left: 0.25rem;
        font-size: 0.625rem;
      }
      
      .detail-movie__genre {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: .875rem;
        font-size: .75rem;
        text-transform: capitalize;
      }
      
      .detail-movie__action-button {
        margin-top: 1.5rem;
        text-decoration: none;
        width: fit-content;
      }
      
      .detail-movie__section {
        display: grid;
        grid-auto-flow: row;
        gap: 1.5rem;
      }
      
      .detail-movie__section-title {
        font-size: 1.125rem;
        font-weight: 500;
      }
      
      .detail-movie__overview {
        line-height: 1.75;
      }
      
      @media only screen and (max-width: 991px) {
        .detail-movie__wrapper {
          grid-template-columns: 1fr;
          margin-top: -10rem;
          text-align: center;
        }
      
        .detail-movie__poster {
          width: 8rem;
          margin-inline: auto;
        }
      
        .detail-movie__rate,
        .detail-movie__genre {
          justify-content: center;
        }
      
        .detail-movie__action-button {
          margin-inline: auto;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="detail-movie__inner">
      <div class="detail-movie__header container">
        <button type="button" class="detail-movie__close-button">
          <span class="material-icons-round">close</span>
        </button>
      </div>
      <div class="detail-movie__body container container_size_lg">
        <article class="detail-movie__main">
          <div class="detail-movie__backdrop">
            <div class="detail-movie__overlay">
              <img src="${this.movie.backdrop_path}" alt="" class="detail-movie__image" loading="lazy" />
            </div>
          </div>
          <div class="detail-movie__wrapper container container_size_md">
            <img src="${this.movie.poster_path}" alt="" class="detail-movie__poster" loading="lazy" />
            <div>
              <p class="detail-movie__release">${this.movie.release_date || this.movie.first_air_date}</p>
              <h3 class="detail-movie__title">${this.movie.title || this.movie.name}</h3>
              <p class="detail-movie__tagline">${this.movie.tagline}</p>
              <div class="detail-movie__rate"></div>
              <div class="detail-movie__genre"></div>
              <a ${this.movie.trailer ? `href="https://youtu.be/${this.movie.trailer.key}"` : ''} target="_blank" class="detail-movie__action-button button ${this.movie.trailer ? '' : 'button_disabled'}">
                <span class="button__prepend material-icons-round">play_arrow</span>
                <span class="button__body">Play Trailer</span>
              </a>
            </div>
          </div>
          <div class="detail-movie__section">
            <h4 class="detail-movie__section-title">About</h4>
            <p class="detail-movie__overview">
              ${this.movie.overview}
            </p>
          </div>
          <div class="detail-movie__section">
            <h4 class="detail-movie__section-title">Cast</h4>
            <cast-slider></cast-slider>
          </div>
        </article>
        <div class="detail-movie__section similar">
          <h3 class="detail-movie__section-title">Similar</h3>
          <movie-slider></movie-slider>
        </div>
        <div class="detail-movie__section recommendations">
          <h3 class="detail-movie__section-title">Recomendation</h3>
          <movie-slider></movie-slider>
        </div>
      </div>
    </div>`;

    this.init();
  }

  init() {
    const closeButton = this.querySelector('.detail-movie__close-button');

    this.renderRating();
    this.movie.genres.forEach((genre) => {
      this.addGenre(genre);
    });
    this.toggleDetailMovie();
    closeButton.addEventListener('click', () => {
      this.toggleDetailMovie();
    });
  }

  renderRating() {
    const ratingContainer = this.querySelector('.detail-movie__rate');
    const rating = this.movie.vote_average / 2;
    const ratingRound = Math.round(rating);
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      if (i < ratingRound) {
        ratingContainer.innerHTML += '<span class="material-icons-round">star</span>';
      } else if (i === ratingRound && ratingRound <= rating) {
        ratingContainer.innerHTML += '<span class="material-icons-round">star</span>';
      } else if (i === ratingRound && ratingRound > rating) {
        ratingContainer.innerHTML += '<span class="material-icons-round">star_half</span>';
      } else {
        ratingContainer.innerHTML += '<span class="material-icons-round">star_outline</span>';
      }
    }

    ratingContainer.innerHTML += `<span>${this.movie.vote_average}</span>`;
  }

  addGenre(genre) {
    const genreContainer = this.querySelector('.detail-movie__genre');
    genreContainer.innerHTML += `<span>${genre.name}</span>`;
  }

  toggleDetailMovie() {
    const detailMovie = this.querySelector('.detail-movie__inner');
    const page = document.body;

    if (detailMovie.classList.contains('detail-movie__inner_show')) {
      detailMovie.classList.remove('detail-movie__inner_show');
      detailMovie.addEventListener('transitionend', () => {
        this.remove();

        const pageDetail = page.querySelectorAll('detail-movie');
        if (!pageDetail.length) {
          page.classList.remove('page_overflow_hidden');
        }
      });
      return;
    }

    setTimeout(() => {
      detailMovie.classList.add('detail-movie__inner_show');
    }, 20);
  }

  renderError(message) {
    this.innerHTML = `
    <style>
      .detail-movie__inner{
        position: relative;
        top: 100vh;
        background-color: var(--black);
        transition: top .25s;
      }
      
      .detail-movie__inner_show{
        top: 0;
      }

      .detail-movie__header {
        padding-block: 0.75rem;
        background-color: var(--black);
        color: rgba(248, 249, 250, 0.5);
        border-bottom: 1px solid rgba(248, 249, 250, 0.125);
        z-index: 1010;
      }
      
      .detail-movie__close-button {
        display: flex;
        align-items: center;
        margin-left: auto;
        padding: .5rem;
        background-color: transparent;
        color: inherit;
        border: none;
        cursor: pointer;
      }

      .detail-movie__error {
        padding-block: 6rem;
        min-height: 100vh;
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
    </style>`;

    this.innerHTML += `
    <div class="detail-movie__inner">
      <div class="detail-movie__header container">
        <button type="button" class="detail-movie__close-button">
          <span class="material-icons-round">close</span>
        </button>
      </div>
      <p class="detail-movie__error">${message}</p>
    </div>`;

    const closeButton = this.querySelector('.detail-movie__close-button');

    this.toggleDetailMovie();
    closeButton.addEventListener('click', () => {
      this.toggleDetailMovie();
    });
  }
}

customElements.define('detail-movie', DetailMovie);
