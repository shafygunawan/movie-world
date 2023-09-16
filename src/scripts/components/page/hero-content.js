import CONFIG from '../../global/config';

class HeroContent extends HTMLElement {
  setMovie(movie) {
    movie.backdrop_path = movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : './images/backdrop-not-available.png';

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

  setDetailClickedEvent(event) {
    const detailButton = this.querySelector('.hero-content__detail');
    detailButton.addEventListener('click', () => event(this.movie.id));
  }

  render() {
    this.innerHTML = `
    <style>
      .hero-content__inner {
        display: grid;
        grid-template-columns: 1fr 5fr 6fr;
        align-items: center;
      }
      
      .hero-content__summary {
        grid-column-start: 2;
        padding-block: 5rem;
        background-image: linear-gradient(to right, var(--black), transparent);
      }
      
      .hero-content__title {
        font-size: 2.75rem;
        letter-spacing: .275rem;
        text-transform: uppercase;
      }
      
      .hero-content__tagline {
        margin-top: .5rem;
        font-style: italic;
        color: rgba(248, 249, 250, .75);
      }
      
      .hero-content__rate {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 1.5rem;
      }
      
      .hero-content__rate .material-icons-round {
        font-size: 1.375rem;
        color: var(--yellow);
      }
      
      .hero-content__rate span:last-child {
        margin-left: 0.25rem;
        font-size: 0.75rem;
      }
      
      .hero-content__genre {
        margin-top: .5rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.125rem;
        font-size: .875rem;
        text-transform: capitalize;
      }
      
      .hero-content__action-button {
        margin-top: 1.5rem;
        text-decoration: none;
        width: fit-content;
      }

      .hero-content__detail {
        margin-top: .75rem;
        padding: 0;
        background-color: transparent;
        border: none;
        color: rgba(248, 249, 250, .75);
        cursor: pointer;
        font-family: inherit;
        font-size: .875rem;
        text-decoration: underline;
        transition: color .15s;
      }

      .hero-content__detail:hover {
        color: var(--white);
      }
      
      .hero-content__overview {
        margin-top: 1.5rem;
        line-height: 1.75;
        background-image: linear-gradient(to bottom, rgba(248, 249, 250, .5), transparent);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        height: 7rem;
        overflow: hidden;
      }
      
      .hero-content__backdrop {
        position: relative;
        min-height: 550px;
        z-index: -1;
      }
      
      .hero-content__overlay {
        position: absolute;
        top: -2.5rem;
        right: 0;
        width: 170%;
        border-radius: 9999rem;
        box-shadow: 0px 0 100px 125px var(--black) inset;
      }
      
      .hero-content__image {
        position: relative;
        display: block;
        width: 100%;
        border: 1px solid var(--black);
        border-radius: 9999rem;
        z-index: -1;
      }
      
      .hero-content__play-button {
        display: none;
      }
      
      @media only screen and (max-width: 1399px) {
        .hero-content__backdrop {
          min-height: 460px;
        }
      }
      
      @media only screen and (max-width: 1199px) {
        .hero-content__inner {
          grid-template-columns: repeat(2, 1fr);
        }
      
        .hero-content__summary {
          grid-column-start: 1;
        }
      
        .hero-content__title {
          font-size: 2.5rem;
          letter-spacing: .25rem;
        }
      
        .hero-content__backdrop {
          min-height: 400px;
        }
      
        .hero-content__overlay {
          width: 180%;
        }
      }
      
      @media only screen and (max-width: 991px) {
        .hero-content__inner {
          grid-template-columns: 1fr;
          justify-content: center;
        }
      
        .hero-content__summary {
          display: none;
        }
      
        .hero-content__backdrop {
          min-height: auto;
          z-index: unset;
        }
      
        .hero-content__overlay {
          position: static;
          width: 100vw;
          border-radius: 0;
          box-shadow: none;
        }
      
        .hero-content__image {
          border: none;
          border-radius: 0;
        }
      
        .hero-content__play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          background-color: var(--black);
          color: var(--white);
          opacity: .75;
          border: none;
          border-radius: 9999rem;
          text-decoration: none;
        }
      
        .hero-content__play-button .material-icons-round {
          font-size: 3rem;
        }

        .hero-content__play-button_disabled {
          display: none;
        }
      }
      
      @media only screen and (max-width:767px) {
        .hero-content__play-button .material-icons-round {
          font-size: 2.5rem;
        }
      }
      
      @media only screen and (max-width:575px) {
        .hero-content__play-button {
          padding: .75rem;
        }
      
        .hero-content__play-button .material-icons-round {
          font-size: 2.25rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <article class="hero-content__inner container">
      <div class="hero-content__summary">
        <h1 class="hero-content__title">${this.movie.title || this.movie.name}</h1>
        <p class="hero-content__tagline">${this.movie.tagline}</p>
        <div class="hero-content__rate"></div>
        <div class="hero-content__genre"></div>
        <a ${this.movie.trailer ? `href="https://youtu.be/${this.movie.trailer.key}"` : ''} target="_blank" class="hero-content__action-button button button_size_lg ${this.movie.trailer ? '' : 'button_disabled'}">
          <span class="button__prepend material-icons-round">play_arrow</span>
          <span class="button__body">Play Trailer</span>
        </a>
        <button type="button" class="hero-content__detail">Detail</button>
        <p class="hero-content__overview">
          ${this.movie.overview}
        </p>
      </div>
      <div class="hero-content__backdrop">
        <div class="hero-content__overlay">
          <img src="${this.movie.backdrop_path}" alt="" class="hero-content__image" loading="lazy" />
          <a ${this.movie.trailer ? `href="https://youtu.be/${this.movie.trailer.key}"` : ''} target="_blank" class="hero-content__play-button ${this.movie.trailer ? '' : 'hero-content__play-button_disabled'}">
            <span class="material-icons-round">play_arrow</span>
          </a>
        </div>
      </div>
    </article>`;

    this.init();
  }

  init() {
    this.renderRating();
    this.movie.genres.forEach((genre) => {
      this.addGenre(genre);
    });
  }

  renderRating() {
    const ratingContainer = this.querySelector('.hero-content__rate');
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
    const genreContainer = this.querySelector('.hero-content__genre');
    genreContainer.innerHTML += `<span>${genre.name}</span>`;
  }

  renderError(message) {
    this.innerHTML = `
    <style>
      .hero-content__error {
        min-height: 350px;
        padding-block: 6rem;
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }
    </style>`;

    this.innerHTML += `
    <article class="hero-content__inner container">
      <p class="hero-content__error">${message}</p>
    </article>`;
  }
}

customElements.define('hero-content', HeroContent);
