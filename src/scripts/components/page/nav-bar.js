import '../form/search-form';

class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setSwitchMenuEvent(event) {
    this.querySelectorAll('.menu__link').forEach((menuLink) => {
      menuLink.addEventListener('click', event);
    });
  }

  getActiveMenuId() {
    return this.querySelector('.menu__link_active').dataset.menuId;
  }

  getSearchFormElement() {
    return this.querySelector('search-form');
  }

  render() {
    this.innerHTML = `
    <style>
      .nav-bar__inner {
        display: grid;
        grid-template: auto / auto 1fr;
        justify-content: space-between;
        align-items: center;
        background-color: var(--black);
        border-bottom: 1px solid rgba(248, 249, 250, .125);
      }
      
      .nav-bar__brand {
        margin-right: 1rem;
        padding-block: 1.375rem;
        font-family: "Bebas Neue", sans-serif;
        font-size: 1.5rem;
        letter-spacing: 0.15rem;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--primary);
        cursor: default;
      }
      
      .nav-bar__toggler {
        display: none;
      }
      
      .nav-bar__nav {
        display: grid;
        grid-template: auto / 1fr auto;
        align-items: center;
      }
      
      .nav-bar__menu {
        gap: 3rem;
      }
      
      @media only screen and (max-width: 991px) {
        .nav-bar__inner {
          grid-template: repeat(2, auto) / auto 1fr;
        }
      
        .nav-bar__toggler {
          display: grid;
          align-items: center;
          width: max-content;
          margin-left: auto;
          padding: .25rem .75rem;
          background-color: transparent;
          color: inherit;
          border: none;
          cursor: pointer;
        }
      
        .nav-bar__toggler .material-icons-round {
          font-size: 1.75rem;
        }
      
        .nav-bar__nav {
          grid-column-end: span 2;
          display: none;
          grid-template: repeat(2, auto) / auto;
          gap: 1.5rem;
          margin-top: -100vh;
          padding-bottom: 1rem;
          opacity: 0;
          transition: margin-top 1s, opacity .25s;
        }
      
        .nav-bar__nav_show {
          display: grid;
        }
      
        .nav-bar__nav_show_transition {
          margin-top: 0;
          opacity: 1;
          transition: margin-top .25s, opacity 1s;
        }
      
        .nav-bar__menu {
          grid-auto-flow: row;
          gap: .75rem;
        }
      
        .nav-bar__menu .menu__link {
          padding-block: .75rem;
        }
      }
    </style>`;

    this.innerHTML += `
    <div class="nav-bar__inner container">
      <a href="" class="nav-bar__brand">movie world</a>
      <button type="button" class="nav-bar__toggler">
        <span class="material-icons-round">menu</span>
      </button>
      <div class="nav-bar__nav">
        <nav class="nav-bar__menu menu">
          <button type="menu" class="menu__link menu__link_active" data-menu-id="1">movie</button>
          <button type="menu" class="menu__link" data-menu-id="2">TV</button>
        </nav>
        <search-form></search-form>
      </div>
    </div>`;

    this.init();
  }

  init() {
    const menus = this.querySelectorAll('.menu__link');
    const menuToggler = this.querySelector('.nav-bar__toggler');

    menus.forEach((menu) => {
      menu.addEventListener('click', (event) => this.switchMenu(event.currentTarget));
    });
    menuToggler.addEventListener('click', () => this.toggleMenu());
  }

  switchMenu(newMenuActive) {
    const menuActive = this.querySelector('.menu__link_active');
    menuActive.classList.remove('menu__link_active');
    newMenuActive.classList.add('menu__link_active');
  }

  toggleMenu() {
    const nav = this.querySelector('.nav-bar__nav');

    if (nav.classList.contains('nav-bar__nav_show')) {
      nav.classList.remove('nav-bar__nav_show_transition');
      nav.addEventListener('transitionend', () => {
        nav.classList.remove('nav-bar__nav_show');
      }, {
        once: true,
      });
      return;
    }

    nav.classList.add('nav-bar__nav_show');
    setTimeout(() => {
      nav.classList.add('nav-bar__nav_show_transition');
    }, 20);
  }
}

customElements.define('nav-bar', NavBar);
