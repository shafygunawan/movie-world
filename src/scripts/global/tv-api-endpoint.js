import CONFIG from './config';

const TV_API_ENDPOINT = {
  AIRING_TODAY: `${CONFIG.BASE_URL}/tv/airing_today?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  GENRES: `${CONFIG.BASE_URL}/genre/tv/list?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`,
  ON_THE_AIR: `${CONFIG.BASE_URL}/tv/on_the_air?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  CREDITS: (id) => `${CONFIG.BASE_URL}/tv/${id}/credits?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`,
  SIMILAR: (id) => `${CONFIG.BASE_URL}/tv/${id}/similar?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  RECOMMENDATIONS: (id) => `${CONFIG.BASE_URL}/tv/${id}/recommendations?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  SEARCH: (keyword) => `${CONFIG.BASE_URL}/search/tv?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&query=${keyword}&page=1`,
  DETAILS: (id, withVideos) => {
    let url = `${CONFIG.BASE_URL}/tv/${id}?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}`;
    if (withVideos) {
      url += '&append_to_response=videos';
    }
    return url;
  },
  DISCOVER: ({
    genreIds, sortBy, releaseYear, page,
  }) => {
    let url = `${CONFIG.BASE_URL}/discover/tv?api_key=${CONFIG.API_KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&with_genres=${genreIds}&sort_by=${sortBy}&page=${page}`;
    if (releaseYear) {
      url += `&primary_release_year=${releaseYear}`;
    }
    return url;
  },
};

export default TV_API_ENDPOINT;
