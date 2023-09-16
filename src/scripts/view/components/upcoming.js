import '../../components/slider/superior-slider';
import '../../components/slider/regular-slider';

const upcoming = (Source) => {
  const title = document.querySelector('.upcoming__title');
  const superior = document.querySelector('.upcoming superior-slider');
  const regular = document.querySelector('.upcoming regular-slider');

  const onDetailClicked = (id) => {
    import('./detail')
      .then(({ default: detail }) => {
        detail(id, Source);
      });
  };

  const init = async () => {
    try {
      let movies = {};
      try {
        movies = await Source.upcoming();
        title.innerHTML = 'Upcoming';
      } catch {
        try {
          movies = await Source.onTheAir();
          title.innerHTML = 'On The Air';
        } catch (message) {
          superior.renderError(message);
          regular.renderError(message);
          throw message;
        }
      }

      if (movies.results.length < 9) {
        superior.setMovies(movies.results);
        superior.setDetailClickedEvent(onDetailClicked);
        return;
      }

      superior.setMovies(movies.results.slice(0, 5));
      superior.setDetailClickedEvent(onDetailClicked);
      regular.setMovies(movies.results.slice(5));
      regular.setItemClickedEvent(onDetailClicked);
    } catch (message) {
      superior.renderError(message);
      regular.renderError(message);
    }
  };

  init();
};

export default upcoming;
