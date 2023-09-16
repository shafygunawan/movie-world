import '../item/search-item';

class SearchForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setMovies(movies) {
    const searchList = this.querySelector('.search-list__inner');
    searchList.innerHTML = '';

    movies.forEach((movie) => {
      const searchItemElement = document.createElement('search-item');

      searchItemElement.setMovie(movie);
      searchList.appendChild(searchItemElement);
    });
  }

  setSearchEvent(event) {
    this.querySelector('#search').addEventListener('input', event);
    this.querySelectorAll('.search__tab').forEach((searchTab) => {
      searchTab.addEventListener('click', event);
    });
  }

  setDetailClickedEvent(event) {
    const searchItems = this.querySelectorAll('search-item');
    searchItems.forEach((searchItem) => {
      searchItem.setDetailClickedEvent(event);
    });
  }

  getValue() {
    return this.querySelector('#search').value;
  }

  getActiveTabId() {
    return this.querySelector('.search__tab_active').dataset.tabId;
  }

  render() {
    this.innerHTML = `
    <style>
      .search,
      .search__input-group {
        position: relative;
      }
      
      .search__label {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        display: grid;
        align-items: center;
        justify-content: center;
        color: rgba(248, 249, 250, .25);
        transition: color .15s;
      }
      
      .search:focus-within .search__label {
        color: var(--primary);
      }
      
      .search__label .material-icons-round {
        font-size: 1.375rem;
      }
      
      .search__input {
        width: 17rem;
        padding: .5rem 1.25rem .5rem 3rem;
        font-family: "Montserrat", sans-serif;
        font-size: .875rem;
        background-color: rgba(248, 249, 250, .125);
        color: inherit;
        border: 1px solid transparent;
        border-radius: 9999rem;
        transition: border-color .15s;
      }
      
      .search__input::placeholder {
        color: rgba(248, 249, 250, .25);
      }
      
      .search:focus-within .search__input {
        border-color: var(--primary);
      }
      
      .search__result {
        position: absolute;
        top: 130%;
        right: 0;
        display: none;
        width: 21.25rem;
        max-height: 20rem;
        overflow: hidden;
        background-color: var(--black);
        border: 1px solid rgba(248, 249, 250, .125);
        border-radius: .25rem;
      }
      
      .search__result_show {
        display: block;
      }
      
      .search__header {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
      }
      
      .search__tab {
        padding: .625rem .75rem;
        font-family: "Montserrat", sans-serif;
        font-size: .875rem;
        background-color: rgba(248, 249, 250, .125);
        color: inherit;
        border: none;
        cursor: pointer;
        transition: background-color .15s;
      }
      
      .search__tab:first-child {
        border-top-left-radius: .25rem;
      }
      
      .search__tab:last-child {
        border-top-right-radius: .25rem;
      }
      
      .search__tab_active {
        background-color: transparent;
      }
      
      .search__result .search__body {
        padding: 1.5rem;
        overflow: auto;
        max-height: 17rem;
      }

      .search-list__inner {
        display: grid;
        grid-auto-flow: row;
        gap: 1.25rem;
      }

      .search-list__error{
        font-size: .875rem;
        text-align: center;
        color: rgba(248, 249, 250, .75);
      }

      @media only screen and (max-width: 991px) {
        .search {
          display: grid;
          justify-content: center;
        }
      
        .search__input {
          width: 21.25rem;
        }
      
        .search__result {
          position: static;
          margin-top: .75rem;
        }
      }
      
      @media only screen and (max-width: 575px) {
        .search__input,
        .search__result {
          width: 100%;
          max-width: 21.25rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <form class="search">
      <div class="search__input-group">
        <label class="search__label" for="search">
          <span class="material-icons-round">search</span>
        </label>
        <input type="search" id="search" class="search__input" placeholder="Search something here . . ."
          autocomplete="off" />
      </div>
      <div class="search__result">
        <div class="search__header">
          <button type="button" class="search__tab search__tab_active" data-tab-id="1">Movie</button>
          <button type="button" class="search__tab" data-tab-id="2">TV</button>
        </div>
        <div class="search__body">
          <div class="search-list__inner"></div>
        </div>
      </div>
    </form>`;

    this.init();
  }

  init() {
    const search = this.querySelector('.search');
    const searchTabs = this.querySelectorAll('.search__tab');

    search.addEventListener('click', (event) => {
      this.showDropdown();
      event.stopPropagation();
    });
    window.addEventListener('click', () => this.hideDropdown());
    searchTabs.forEach((searchTab) => {
      searchTab.addEventListener('click', (event) => this.switchTab(event.currentTarget));
    });
  }

  showDropdown() {
    const searchDropdown = this.querySelector('.search__result');
    searchDropdown.classList.add('search__result_show');
  }

  hideDropdown() {
    const searchDropdown = this.querySelector('.search__result');
    searchDropdown.classList.remove('search__result_show');
  }

  switchTab(newTabActive) {
    const tabActive = this.querySelector('.search__tab_active');
    tabActive.classList.remove('search__tab_active');
    newTabActive.classList.add('search__tab_active');
  }

  renderError(message) {
    const searchList = this.querySelector('.search-list__inner');
    const errorELement = document.createElement('p');
    searchList.innerHTML = '';

    errorELement.className = 'search-list__error';
    errorELement.innerHTML = message;

    searchList.appendChild(errorELement);
  }
}

customElements.define('search-form', SearchForm);
