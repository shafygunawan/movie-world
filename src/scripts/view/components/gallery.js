import '../../components/page/hero-content';
import '../../components/slider/thumb-slider';

const gallery = (Source) => {
  const preview = document.querySelector('.gallery hero-content');
  const thumb = document.querySelector('.gallery thumb-slider');

  const onDetailClicked = (id) => {
    import('./detail')
      .then(({ default: detail }) => {
        detail(id, Source);
      });
  };

  const onSlide = async () => {
    try {
      const movie = await Source.detail(thumb.getActiveSlideId(), true);
      preview.setMovie(movie);
      preview.setDetailClickedEvent(onDetailClicked);
    } catch (message) {
      preview.renderError(message);
    }
  };

  const init = async () => {
    try {
      let movies = null;
      try {
        movies = await Source.nowPlaying();
      } catch {
        try {
          movies = await Source.airingToday();
        } catch (message) {
          preview.renderError(message);
          thumb.renderError(message);
          throw message;
        }
      }

      thumb.setMovies(movies.results);
      thumb.setSlideEvent(onSlide);

      const movie = await Source.detail(thumb.getActiveSlideId(), true);
      preview.setMovie(movie);
      preview.setDetailClickedEvent(onDetailClicked);
    } catch (message) {
      preview.renderError(message);
      thumb.renderError(message);
    }
  };

  init();
};

export default gallery;
