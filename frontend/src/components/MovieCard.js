import React, { useState } from "react"
import axios from "axios"
import { Col, Card } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
function MovieCard({ data, pageId }) {
  const [runtime, setRuntime] = useState([])
  const fetchRuntime = (type, id) => {
    if (type === "movie") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
        )
        .then(function (response) {
          const { data } = response
          setRuntime((prevValues) => {
            return [...prevValues, data.runtime]
          })
        })
    }
    if (type === "tv") {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=235ba309beb6b48e95dc065bc6ac50cf&language=en-US`
        )
        .then(function (response) {
          const { data } = response
          setRuntime((prevValues) => {
            return [...prevValues, data.episode_run_time[0]]
          })
        })
    }
  }

  data = pageId ? data : data.slice(0, 6)

  return (
    <>
      {data.map(
        (movie, index) =>
          movie.backdrop_path && (
            <LinkContainer
              to={`/${movie.media_type}/${movie.id}`}
              role="button"
              key={movie.id}
            >
              <Col className="mb-3 movie-col" lg={2} md={3} sm={4} xs={6}>
                <Card className="bg-dark" style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>
                      {movie.title ? movie.title : movie.name}
                    </Card.Title>
                    <span className="type">
                      {movie.media_type.charAt(0).toUpperCase() +
                        movie.media_type.slice(1)}
                    </span>
                    <div className="d-flex brief mb-2">
                      <span>
                        {movie.media_type === "movie" &&
                        movie.release_date !== undefined
                          ? movie.release_date.slice(0, 4)
                          : movie.first_air_date !== undefined
                          ? movie.first_air_date.slice(0, 4)
                          : ""}
                      </span>
                      <span>
                        {!runtime[index]
                          ? fetchRuntime(movie.media_type, movie.id)
                          : runtime[index]}
                        min
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </LinkContainer>
          )
      )}
    </>
  )
}

export default MovieCard
