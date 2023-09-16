import CONFIG from './config';

const MOVIE_API_ENDPOINT = {
  NOW_PLAYING: `${CONFIG.BASE_URL}/movie/now_playing?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  GENRES: `${CONFIG.BASE_URL}/genre/movie/list?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`,
  UPCOMING: `${CONFIG.BASE_URL}/movie/upcoming?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  CREDITS: (id) => `${CONFIG.BASE_URL}/movie/${id}/credits?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`,
  SIMILAR: (id) => `${CONFIG.BASE_URL}/movie/${id}/similar?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  RECOMMENDATIONS: (id) => `${CONFIG.BASE_URL}/movie/${id}/recommendations?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  SEARCH: (keyword) => `${CONFIG.BASE_URL}/search/movie?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&query=${keyword}&page=1`,
  DETAILS: (id, withVideos) => {
    let url = `${CONFIG.BASE_URL}/movie/${id}?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`;
    if (withVideos) {
      url += '&append_to_response=videos';
    }
    return url;
  },
  DISCOVER: ({
    genreIds, sortBy, releaseYear, page,
  }) => {
    let url = `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&with_genres=${genreIds}&sort_by=${sortBy}&page=${page}`;
    if (releaseYear) {
      url += `&primary_release_year=${releaseYear}`;
    }
    return url;
  },
};

export default MOVIE_API_ENDPOINT;
