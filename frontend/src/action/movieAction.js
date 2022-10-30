import axios from "axios"
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
export const listMovies = (page, type, keyword) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST })

    if (keyword) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US&include_adult=true&query=${keyword}&page=${
          page || 1
        }`
      )
      dispatch({
        type: MOVIE_LIST_SUCCESS,
        payload: data,
      })
      dispatch({
        type: "MOVIE_LIST_PAGES",
        payload: data,
      })
    } else {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=235ba309beb6b48e95dc065bc6ac50cf&page=${
          page || 1
        }`
      )
      dispatch({
        type: MOVIE_LIST_SUCCESS,
        payload: data,
      })
      dispatch({
        type: "MOVIE_LIST_PAGES",
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getGenres = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US"
    )
    var genreObj = {}

    data.genres.map(
      (genre) => (genreObj = { ...genreObj, [genre.id]: genre.name })
    )
    dispatch({
      type: MOVIE_GENRES_SUCCESS,
      payload: genreObj,
    })
  } catch (error) {
    dispatch({
      type: MOVIE_GENRES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_DETAILS_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
    )

    dispatch({
      type: MOVIE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTvDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TV_DETAILS_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
    )

    dispatch({
      type: TV_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TV_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
