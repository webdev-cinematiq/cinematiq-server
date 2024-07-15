import TV from '../tv';

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


const findTVFromTMDB = async (tmdbId) => {
  const url = `${TMDB_BASE_URL}/tv/${tmdbId}?api_key=${REACT_APP_TMDB_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};


export const getTV = async (tmdbId) => {
  let tvShow = await TvShow.findOne({ tmdbId });
  if (!tvShow) {
    const tmdbTvShow = await findTVFromTMDB(tmdbId);
    tvShow = new TV({
      tmdbId: tmdbTvShow.id,
      name: tmdbTvShow.name,
      overview: tmdbTvShow.overview,
      firstAirDate: tmdbTvShow.first_air_date,
      genres: tmdbTvShow.genres.map((genre) => genre.name),
      posterPath: tmdbTvShow.poster_path,
      backdropPath: tmdbTvShow.backdrop_path,
    });
    await tvShow.save();
  }
  return tvShow;
};
