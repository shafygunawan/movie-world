import CONFIG from '../../global/config';

class MovieItem extends HTMLElement {
  setMovie(movie) {
    movie.poster_path = movie.poster_path ? CONFIG.BASE_IMAGE_URL + movie.poster_path : './images/poster-not-available.png';
    this.movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <article class="card">
      <div class="card__poster">
        <img src="${this.movie.poster_path}" alt="" class="card__image" loading="lazy" />
        <p class="card__rate">
          <span class="material-icons-round">star</span> ${this.movie.vote_average}
        </p>
      </div>
      <div class="card__body">
        <p class="card__label">${this.movie.genres.map((genre) => genre.name).join(', ')}</p>
        <h3 class="card__title">${this.movie.title || this.movie.name}</h3>
      </div>
    </article>`;
  }
}

customElements.define('movie-item', MovieItem);
