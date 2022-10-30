import {
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_GENRES_FAIL,
  MOVIE_GENRES_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  TV_DETAILS_FAIL,
  TV_DETAILS_REQUEST,
  TV_DETAILS_SUCCESS,
} from "../constants/movieConstants"

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true, movies: [] }
    case MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload.results }
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const moviePagesReducer = (state = 0, action) => {
  switch (action.type) {
    case "MOVIE_LIST_PAGES":
      return action.payload.total_pages
    default:
      return state
  }
}

export const movieGenreReducer = (state = { genres: {} }, action) => {
  switch (action.type) {
    case MOVIE_GENRES_SUCCESS:
      return { loading: false, genres: action.payload }
    case MOVIE_GENRES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return { loading: true, movie: {} }
    case MOVIE_DETAILS_SUCCESS:
      return { loading: false, movie: action.payload }
    case MOVIE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tvDetailsReducer = (state = { tv: {} }, action) => {
  switch (action.type) {
    case TV_DETAILS_REQUEST:
      return { loading: true, tv: {} }
    case TV_DETAILS_SUCCESS:
      return { loading: false, tv: action.payload }
    case TV_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const apiReducer = (state = "", action) => {
  switch (action.type) {
    case "API_KEY_SUCCESS":
      return action.payload
    default:
      return state
  }
}
