# Movie World

**Movie World** is a website that allows you to explore and find out more about movies and TV shows. This app fetches data from The Movie DB's public API.

## Table of Contents

- [Main Features](#main-features)
- [Usage](#usage)
  - [Installation](#installation)
  - [Running the Application (Development)](#running-the-application-development)
  - [Building the Application (Production)](#building-the-application-production)
  - [Code Check (Linting)](#code-check-linting)
  - [CSS Sorting](#css-sorting)
- [Support Me](#support-me)
- [License](#license)

## Main Features

- Displays a list of recent and upcoming movies.
- Displays a list of recent and upcoming TV shows.
- Search for movies or TV shows by title.
- Sort or filter movies or TV shows by genre, year, and popularity.
- Display full details about the movie or TV show including synopsis, rating and more.

## Usage

This app uses The Movie DB API to get movie and TV show data. You need to create an account at [https://www.themoviedb.org/](https://www.themoviedb.org/) to get the API key.

### Installation

1. Clone this repository to your computer:

   ```bash
   git clone https://github.com/shafygunawan/movie-world.git
   ```

2. Go to the project directory:

   ```bash
   cd movie-world
   ```

3. Install the required dependencies with the npm command:

   ```bash
   npm install
   ```

4. After that, you need to set your API key and other configurations inside this project. Open the `src/scripts/global/config.js` file and add `API_KEY`, `BASE_URL`, `BASE_IMAGE_URL`, and `DEFAULT_LANGUAGE` according to the API key you got from The Movie DB like the following example:

   ```js
   const CONFIG = {
     API_KEY: "your_api_key",
     BASE_URL: "https://api.themoviedb.org/3",
     BASE_IMAGE_URL: "https://image.tmdb.org/t/p/w500",
     DEFAULT_LANGUAGE: "en-US",
   };
   ```

All the fields above are just examples, you can adjust to your conditions.

### Running the Application (Development)

To run the application, use the following command:

```bash
npm run serve
```

The application will run at `http://localhost:8080`.

### Building the Application (Production)

To build the application in production mode, run the following command:

```bash
npm run build
```

### Code Check (Linting)

To run ESLint checks on your code, run the following command:

```bash
npm run lint
```

This command will run ESLint on the `./src` directory and provide a report on potential code style issues or violations.

### CSS Sorting

To sort your CSS files using PostCSS, run the following command:

```bash
npm run css-sorting
```

This command will run PostCSS to sort your CSS files and replace the original files with the sorted versions.

## Support Me

If you find this project useful and would like to support me, you can <a href="https://www.buymeacoffee.com/shafygunawan" target="_blank">Buy Me a Coffee</a>.

## License

This project is licensed under the MIT License. More details can be found in the [LICENSE](https://github.com/shafygunawan/movie-world/blob/main/LICENSE) file.

Thank you for visiting my project!
