import '../../components/page/detail-movie';

const detail = (movieId, Source) => {
  const init = async (id) => {
    const detailElement = document.createElement('detail-movie');

    detailElement.className = 'page__detail';
    document.body.classList.add('page_overflow_hidden');
    document.body.appendChild(detailElement);

    try {
      const promise = [Source.detail(id, true), Source.credits(id)];
      const [movie, credits] = await Promise.all(promise);

      detailElement.setMovie(movie);

      const castElement = detailElement.getCastSliderElement();
      const similarElement = detailElement.getSimilarSliderElement();
      const recommendationsElement = detailElement.getRecommendationsSliderElement();

      castElement.setCasts(credits.cast);

      try {
        const promiseArr = [Source.similar(id), Source.genres()];
        const [similar, genres] = await Promise.all(promiseArr);

        similar.results.forEach((similarMovie) => {
          similarMovie.genres = genres.filter((genre) => similarMovie.genre_ids.includes(genre.id));
        });

        similarElement.setMovies(similar.results);
        similarElement.setItemClickedEvent(init);
      } catch (message) {
        similarElement.renderError(message);
      }

      try {
        const promiseArr = [Source.recommendations(id), Source.genres()];
        const [recommendations, genres] = await Promise.all(promiseArr);

        recommendations.results.forEach((recommendation) => {
          // eslint-disable-next-line max-len
          recommendation.genres = genres.filter((genre) => recommendation.genre_ids.includes(genre.id));
        });

        recommendationsElement.setMovies(recommendations.results);
        recommendationsElement.setItemClickedEvent(init);
      } catch (message) {
        recommendationsElement.renderError(message);
      }
    } catch (message) {
      detailElement.renderError(message);
    }
  };

  init(movieId);
};

export default detail;
