import React, { useEffect } from "react"
import Loader from "./Loader"
import Message from "./Message"
import { useSelector, useDispatch } from "react-redux"
import { Carousel, Image } from "react-bootstrap"
import { getGenres } from "../action/movieAction"

function MovieCarousel() {
  const dispatch = useDispatch()

  const genreList = useSelector((state) => state.genres)
  const { genres } = genreList

  const movieList = useSelector((state) => state.movieList)
  const { loading: loadingMovie, movies, error } = movieList

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])
  return (
    <>
      {loadingMovie ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel
          interval={3000}
          pause="hover"
          controls={false}
          className="bg-dark rounded mt-2"
        >
          {movies.slice(0, 5).map((movie) => (
            <Carousel.Item key={movie.id}>
              <Image
                className="d-block w-100 backdrop"
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                fluid
              />
              <Carousel.Caption>
                <h3>{movie.title ? movie.title : movie.name}</h3>
                <p className="mt-0 mb-2 info">
                  <span>
                    Type:{" "}
                    {movie.media_type.charAt(0).toUpperCase() +
                      movie.media_type.slice(1)}
                  </span>
                  <span className="ml-3">
                    Genre:
                    {movie.genre_ids.map((genre_id, index) =>
                      genres[genre_id] === undefined
                        ? ""
                        : index !== movie.genre_ids.length - 1
                        ? ` ${genres[genre_id]}, `
                        : ` ${genres[genre_id]} `
                    )}
                  </span>
                </p>
                <p className="about">
                  {movie.overview.split(" ").slice(0, 50).join(" ")}
                </p>
              </Carousel.Caption>
              <div className="overlay"></div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}{" "}
    </>
  )
}

export default MovieCarousel
