import CONFIG from '../../global/config';

class SearchItem extends HTMLElement {
  setMovie(movie) {
    movie.poster_path = movie.poster_path ? CONFIG.BASE_IMAGE_URL + movie.poster_path : './images/poster-not-available.png';
    this.movie = movie;
    this.render();
  }

  setDetailClickedEvent(event) {
    const detailButton = this.querySelector('.search-item__action-button');
    detailButton.addEventListener('click', () => event(this.movie.id));
  }

  render() {
    this.innerHTML = `
    <style>
      .search-item__inner {
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: .75rem;
      }
      
      .search-item__poster {
        display: block;
        width: 100%;
      }
      
      .search-item__title {
        font-size: .875rem;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      
      .search-item__rate {
        margin-top: .25rem;
        color: var(--yellow);
      }
      
      .search-item__rate .material-icons-round {
        font-size: .75rem;
      }
      
      .search-item__genre {
        font-size: .625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      
      .search-item__action-button {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: .125rem;
        margin-top: .625rem;
        padding: 0;
        font-family: inherit;
        font-size: .75rem;
        background-color: transparent;
        color: inherit;
        border: none;
        border-bottom: 1px solid var(--white);
        cursor: pointer;
      }
      
      .search-item__action-button .material-icons-round {
        font-size: inherit;
      }
    </style>`;

    this.innerHTML += `
    <article class="search-item__inner">
      <img src="${this.movie.poster_path}" alt="" class="search-item__poster" loading="lazy" />
      <div>
        <h4 class="search-item__title">${this.movie.title || this.movie.name}</h4>
        <div class="search-item__rate"></div>
        <p class="search-item__genre">
          ${this.movie.genres.map((genre) => genre.name).join(', ')}
        </p>
        <button type="button" class="search-item__action-button">
          Detail
          <span class="material-icons-round">arrow_forward</span>
        </button>
      </div>
    </article>`;

    this.init();
  }

  init() {
    const ratingContainer = this.querySelector('.search-item__rate');
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
  }
}

customElements.define('search-item', SearchItem);
