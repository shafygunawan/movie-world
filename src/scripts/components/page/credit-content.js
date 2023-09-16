class CreditContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
      .credit-content__inner {
        padding-block: 1.5rem;
        text-align: center;
        border-top: 1px solid rgba(248, 249, 250, .125);
      }
      
      .credit-content__inner a {
        color: inherit;
        text-decoration: none;
        transition: color .15s;
      }
      
      .credit-content__inner a:hover {
        color: var(--dark-primary);
      }
      
      .credit-content__copyright {
        font-size: .875rem;
        color: rgba(248, 249, 250, .375);
      }
      
      .credit-content__tmdb-credit {
        margin-top: .75rem;
        font-size: .75rem;
        color: rgba(248, 249, 250, .25);
      }
    </style>`;

    this.innerHTML += `
    <div class="credit-content__inner container">
      <p class="credit-content__copyright">
        Copyright &copy; 2021 <a href="https://www.linkedin.com/in/shafygunawan/" target="_blank">Shafy Gunawan</a>. All rights reserved. GitHub: <a href="https://github.com/shafygunawan/movie-world" target="_blank">Movie World</a>.
      </p>
      <p class="credit-content__tmdb-credit">
        This product uses the TMDB API but is not endorsed or certified by
        <a href="https://www.themoviedb.org" target="_blank">TMDB</a>.
      </p>
    </div>`;
  }
}

customElements.define('credit-content', CreditContent);
