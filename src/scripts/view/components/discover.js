import '../../components/page/discover-nav';
import '../../components/list/movie-list';

const discover = (Source) => {
  const nav = document.querySelector('.discover discover-nav');
  const list = document.querySelector('.discover movie-list');
  let pageLoaded = 0;

  const getMoviesDiscover = async (filterOptions) => {
    try {
      const promise = [Source.discover(filterOptions), Source.genres()];
      const [movies, genres] = await Promise.all(promise);

      movies.results.forEach((movie) => {
        movie.genres = genres.filter((genre) => movie.genre_ids.includes(genre.id));
      });

      return Promise.resolve({ movies, genres });
    } catch (message) {
      return Promise.reject(message);
    }
  };

  const onItemClicked = (id) => {
    import('./detail')
      .then(({ default: detail }) => {
        detail(id, Source);
      });
  };

  const onLoadMore = async () => {
    try {
      const filterOptions = { ...nav.getFilterOptions(), page: pageLoaded + 1 };
      const { movies } = await getMoviesDiscover(filterOptions);

      list.setMoreMovies(movies.results);
      list.setItemClickedEvent(onItemClicked);
      if (movies.page >= movies.total_pages) {
        list.removeLoadMoreButton();
      }

      pageLoaded = movies.page;
    } catch (message) {
      list.removeLoadMoreButton();
      list.loadMoreRenderError(message);
    }
  };

  const onFilter = async () => {
    try {
      const { movies } = await getMoviesDiscover(nav.getFilterOptions());

      list.setMovies(movies.results);
      list.setItemClickedEvent(onItemClicked);

      if (movies.page < movies.total_pages) {
        list.addLoadMoreButton();
        list.setLoadMoreEvent(onLoadMore);
      }

      pageLoaded = movies.page;
    } catch (message) {
      list.renderError(message);
    }
  };

  const init = async () => {
    try {
      const { movies, genres } = await getMoviesDiscover(nav.getFilterOptions());

      nav.setMenus(genres);
      nav.setFilterEvent(onFilter);
      list.setMovies(movies.results);
      list.setItemClickedEvent(onItemClicked);

      if (movies.page < movies.total_pages) {
        list.addLoadMoreButton();
        list.setLoadMoreEvent(onLoadMore);
      }

      pageLoaded = movies.page;
    } catch (message) {
      list.renderError(message);
    }
  };

  init();
};

export default discover;
