import React, { useEffect, useState } from "react"
import { Carousel, Image } from "react-bootstrap"
import axios from "axios"

function MovieCarousel() {
  const [data, setData] = useState([])
  const [genres, setGenres] = useState({})

  const fetchMovies = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=235ba309beb6b48e95dc065bc6ac50cf"
    )
    setData(data.results)
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US"
    )
    data.genres.map((genre) =>
      setGenres((prevValues) => {
        return { ...prevValues, [genre.id]: genre.name }
      })
    )
  }

  useEffect(() => {
    fetchMovies()
    fetchGenres()
  }, [])
  return (
    <>
      <Carousel
        interval={3000}
        pause="hover"
        controls={false}
        className="bg-dark rounded mt-2"
      >
        {data &&
          data.slice(0, 5).map((movie) => (
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
                  {movie.overview.split(" ").slice(0, 50).join(" ")}{" "}
                </p>
              </Carousel.Caption>
              <div className="overlay"></div>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  )
}

export default MovieCarousel
