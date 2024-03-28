import { AXIOS } from './AXIOS'

export const NowPlaying = () => AXIOS().get("/movie/now_playing?language=en-US&page=1")
export const PopularMovie = () => AXIOS().get("/movie/popular?language=en-US&page=1")
export const TopRatedMovie = () => AXIOS().get("/movie/top_rated?language=en-US&page=1")
export const UpcomingMovie = () => AXIOS().get("/movie/upcoming?language=en-US&page=1")
export const DetailsMovie = (movie_id) => AXIOS().get(`/movie/${movie_id}?language=en-US`)
export const SearchMovie = (query) => AXIOS().get(`/search/movie?page=1&query=${query ? query : "movie"}&language=en-US&region=IN`)