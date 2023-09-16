import CONFIG from '../../global/config';

class ThumbItem extends HTMLElement {
  setMovie(movie) {
    movie.poster_path = movie.poster_path ? CONFIG.BASE_IMAGE_URL + movie.poster_path : './images/poster-not-available.png';
    this.movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <article class="card" style="font-size: .75rem;">
      <div class="card__poster">
        <img src="${this.movie.poster_path}" alt="" class="card__image" loading="lazy" />
        <p class="card__rate">
          <span class="material-icons-round">star</span> ${this.movie.vote_average}
        </p>
      </div>
      <div class="card__body">
        <h2 class="card__title">${this.movie.title || this.movie.name}</h2>
      </div>
    </article>`;
  }
}

customElements.define('thumb-item', ThumbItem);
