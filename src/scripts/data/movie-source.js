import MOVIE_API_ENDPOINT from '../global/movie-api-endpoint';

class MovieSource {
  static async search(keyword) {
    try {
      if (keyword.length === 0) return Promise.reject();

      const response = await fetch(MOVIE_API_ENDPOINT.SEARCH(keyword));
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async genres() {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.GENRES);
      const responseJson = await response.json();

      if (responseJson.genres) {
        return Promise.resolve(responseJson.genres);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async nowPlaying() {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.NOW_PLAYING);
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async detail(id, withVideos = false) {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.DETAILS(id, withVideos));
      const responseJson = await response.json();

      if (!responseJson.status_message) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async discover({
    genreIds = '',
    sortBy = 'popularity.desc',
    releaseYear = null,
    page = 1,
  }) {
    const filterOptions = {
      genreIds, sortBy, releaseYear, page,
    };
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.DISCOVER(filterOptions));
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async upcoming() {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.UPCOMING);
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async credits(id) {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.CREDITS(id));
      const responseJson = await response.json();

      if (!responseJson.status_message) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async similar(id) {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.SIMILAR(id));
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }

  static async recommendations(id) {
    try {
      const response = await fetch(MOVIE_API_ENDPOINT.RECOMMENDATIONS(id));
      const responseJson = await response.json();

      if (responseJson.results) {
        return Promise.resolve(responseJson);
      }
      return Promise.reject(responseJson.status_message);
    } catch (message) {
      return Promise.reject(message);
    }
  }
}

export default MovieSource;
