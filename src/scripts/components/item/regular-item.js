import CONFIG from '../../global/config';

class RegularItem extends HTMLElement {
  setMovie(movie) {
    movie.backdrop_path = movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : './images/backdrop-not-available.png';
    this.movie = movie;
    this.render();
  }

  render() {
    this.innerHTML = `
    <article class="card">
      <div class="card__poster">
        <img src="${this.movie.backdrop_path}" alt="" class="card__image" loading="lazy" />
      </div>
      <div class="card__body">
        <p class="card__label">${this.movie.release_date || this.movie.first_air_date}</p>
        <h3 class="card__title">${this.movie.title || this.movie.name}</h3>
      </div>
    </article>`;
  }
}

customElements.define('regular-item', RegularItem);
