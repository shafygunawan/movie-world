import '../components/page/nav-bar';
import '../components/page/detail-movie';

import MovieSource from '../data/movie-source';
import TvSource from '../data/tv-source';

import gallery from './components/gallery';
import discover from './components/discover';
import upcoming from './components/upcoming';

const main = () => {
  const navBar = document.querySelector('nav-bar');
  const searchForm = navBar.getSearchFormElement();

  const getSource = (sourceId) => {
    const id = parseInt(sourceId, 10);
    switch (id) {
      case 1:
        return MovieSource;
      case 2:
        return TvSource;
      default:
        return null;
    }
  };

  const onSwitchMenu = () => {
    const Source = getSource(navBar.getActiveMenuId());

    gallery(Source);
    discover(Source);
    upcoming(Source);
  };

  const onDetailClicked = (id) => {
    const Source = getSource(searchForm.getActiveTabId());
    import('./components/detail')
      .then(({ default: detail }) => {
        detail(id, Source);
      });
  };

  const onSearch = async () => {
    try {
      const Source = getSource(searchForm.getActiveTabId());
      const promise = [Source.search(searchForm.getValue()), Source.genres()];
      const [movies, genres] = await Promise.all(promise);

      movies.results.forEach((movie) => {
        movie.genres = genres.filter((genre) => movie.genre_ids.includes(genre.id));
      });

      searchForm.setMovies(movies.results.slice(0, 10));
      searchForm.setDetailClickedEvent(onDetailClicked);
    } catch (message) {
      if (message === undefined) {
        searchForm.setMovies([]);
        return;
      }

      searchForm.renderError(message);
    }
  };

  const init = () => {
    const Source = getSource(navBar.getActiveMenuId());

    navBar.setSwitchMenuEvent(onSwitchMenu);
    searchForm.setSearchEvent(onSearch);

    gallery(Source);
    discover(Source);
    upcoming(Source);
  };

  init();
};

document.addEventListener('DOMContentLoaded', main);
