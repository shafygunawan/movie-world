import CONFIG from '../../global/config';

class CastItem extends HTMLElement {
  setCast(cast) {
    cast.profile_path = cast.profile_path ? CONFIG.BASE_IMAGE_URL + cast.profile_path : './images/poster-not-available.png';
    this.cast = cast;
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
      .cast-item {
        height: 100%;
        align-items: start;
      }
    </style>`;

    this.innerHTML += `
    <article class="card card_wrapper cast-item">
      <div class="card__poster">
        <img src="${this.cast.profile_path}" alt="" class="card__image" loading="lazy" />
      </div>
      <div class="card__body">
        <h5 class="card__title">${this.cast.name}</h5>
        <p class="card__subtitle">${this.cast.character}</p>
      </div>
    </article>`;
  }
}

customElements.define('cast-item', CastItem);
