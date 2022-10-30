import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  apiReducer,
  movieDetailsReducer,
  movieGenreReducer,
  movieListReducer,
  moviePagesReducer,
  tvDetailsReducer,
} from "./reducers/movieReducer"

const reducers = combineReducers({
  apikey: apiReducer,
  tvDetails: tvDetailsReducer,
  movieDetails: movieDetailsReducer,
  genres: movieGenreReducer,
  movieList: movieListReducer,
  pages: moviePagesReducer,
})

const middleware = [thunk]

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
